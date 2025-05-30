import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject, ReplaySubject, from, of, forkJoin, combineLatest, timer, Subscription } from 'rxjs';
import { map, filter, tap, switchMap, concatMap, mergeMap, debounceTime, distinctUntilChanged, catchError, startWith, scan, shareReplay, take } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { FormControl } from '@angular/forms';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

@Component({
  standalone: false,
  selector: 'app-rxjs-examples',
  templateUrl: './rxjs-examples.html',
  styleUrls: ['./rxjs-examples.css']
})
export class RxjsExamples implements OnInit, OnDestroy {
  // Simple Operators
  ofOutput: any[] = [];
  fromOutput: any[] = [];
  mapOutput: any[] = [];
  filterOutput: any[] = [];
  tapOutput: any[] = [];
  takeOutput: any[] = [];


  // Higher-Order Mapping Operators
  searchInput = new FormControl('');
  searchResult$: Observable<any> | undefined;
  switchMapOutput: any[] = [];
  concatMapOutput: any[] = [];
  mergeMapOutput: any[] = [];

  // Combination Operators
  forkJoinOutput: any;
  combineLatestOutput: any;

  // Error Handling
  errorHandlingOutput: any;

  // Subjects
  subject = new Subject<number>();
  behaviorSubject = new BehaviorSubject<string>('Initial Value (BehaviorSubject)');
  replaySubject = new ReplaySubject<string>(2); // Buffer size 2

  subjectOutput: number[] = [];
  behaviorSubjectOutput: string[] = [];
  replaySubjectOutput: string[] = [];

  // Utility
  debounceOutput: string[] = [];
  distinctUntilChangedOutput: string[] = [];

  private subscriptions = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.initSimpleOperators();
    this.initHigherOrderMappingOperators();
    this.initCombinationOperators();
    this.initErrorHandling();
    this.initSubjects();
    this.initUtilityOperators();
  }

  initSimpleOperators(): void {
    // of
    const of$ = of(1, 2, 3, 'Hello', { name: 'RxJS' }).pipe(
      tap(val => console.log('of - original:', val))
    );
    this.subscriptions.add(of$.subscribe(val => this.ofOutput.push(val)));

    // from (from an array)
    const from$ = from([10, 20, 30, 'World']).pipe(
      tap(val => console.log('from - original:', val))
    );
    this.subscriptions.add(from$.subscribe(val => this.fromOutput.push(val)));

    // map
    const map$ = of(1, 2, 3).pipe(
      map(val => val * 10),
      tap(val => console.log('map - transformed:', val))
    );
    this.subscriptions.add(map$.subscribe(val => this.mapOutput.push(val)));

    // filter
    const filter$ = of(1, 2, 3, 4, 5, 6).pipe(
      filter(val => val % 2 === 0),
      tap(val => console.log('filter - filtered:', val))
    );
    this.subscriptions.add(filter$.subscribe(val => this.filterOutput.push(val)));

    // tap
    const tap$ = of('A', 'B', 'C').pipe(
      tap(val => this.tapOutput.push(`Tapped: ${val}`)),
      map(val => `Processed: ${val}`) // To show tap doesn't alter the stream for next operator
    );
    this.subscriptions.add(tap$.subscribe(val => this.tapOutput.push(val)));

    // take
    const take$ = timer(0, 1000).pipe( // Emits every second
      take(5), // Takes the first 5 values
      tap(val => console.log('take - value:', val))
    );
    this.subscriptions.add(take$.subscribe(val => this.takeOutput.push(val)));
  }

  initHigherOrderMappingOperators(): void {
    // switchMap - Example: Typeahead search
    this.searchResult$ = this.searchInput.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        if (!searchTerm || searchTerm.length < 2) {
          return of([]); // Return empty array if search term is too short
        }
        this.switchMapOutput = []; // Clear previous results for demo
        return ajax.getJSON(`https://jsonplaceholder.typicode.com/users?username_like=${searchTerm}`).pipe(
          tap(results => this.switchMapOutput.push(...(results as any[]))),
          catchError(err => {
            this.switchMapOutput.push(`Error: ${err.message}`);
            return of([]); // Return empty on error
          })
        );
      }),
      startWith([]) // Initial value
    );
    this.subscriptions.add(this.searchResult$.subscribe()); // Subscription managed by async pipe in template or here if needed

    // concatMap - Processes observables sequentially
    const concatMap$ = of(1, 2, 3).pipe(
      concatMap(id => {
        this.concatMapOutput.push(`Requesting data for ID: ${id}`);
        return ajax.getJSON(`https://jsonplaceholder.typicode.com/todos/${id}`).pipe(
          map(todo => ({ id, todo })),
          tap(result => this.concatMapOutput.push(result))
        );
      })
    );
    this.subscriptions.add(concatMap$.subscribe());

    // mergeMap (flatMap) - Processes observables in parallel
    const mergeMap$ = of(1, 2, 3).pipe(
      mergeMap(id => {
        this.mergeMapOutput.push(`Requesting data for ID: ${id} (parallel)`);
        return ajax.getJSON(`https://jsonplaceholder.typicode.com/posts/${id}`).pipe(
          map(post => ({ id, post })),
          tap(result => this.mergeMapOutput.push(result))
        );
      })
    );
    this.subscriptions.add(mergeMap$.subscribe());
  }

  initCombinationOperators(): void {
    const obs1$ = ajax.getJSON<User>('https://jsonplaceholder.typicode.com/users/1').pipe(take(1));
    const obs2$ = ajax.getJSON<User>('https://jsonplaceholder.typicode.com/users/2').pipe(take(1));
    const obs3$ = ajax.getJSON<User>('https://jsonplaceholder.typicode.com/users/3').pipe(take(1));

    // forkJoin - Waits for all observables to complete, emits an array of the last values
    const forkJoin$ = forkJoin([obs1$, obs2$, obs3$]).pipe(
      tap(results => console.log('forkJoin - results:', results))
    );
    this.subscriptions.add(forkJoin$.subscribe(results => this.forkJoinOutput = results));

    // combineLatest - When any observable emits, emits the latest values from all observables
    const timer1$ = timer(0, 4000).pipe(map(i => `Timer 1: ${i}`), take(3));
    const timer2$ = timer(500, 2000).pipe(map(i => `Timer 2: ${i}`), take(4));

    const combineLatest$ = combineLatest([timer1$, timer2$]).pipe(
      tap(values => console.log('combineLatest - values:', values))
    );
    this.subscriptions.add(combineLatest$.subscribe(values => this.combineLatestOutput = values));
  }

  initErrorHandling(): void {
    const error$ = new Observable(observer => {
      observer.next('Emitting value 1');
      observer.next('Emitting value 2');
      observer.error('Something went wrong!');
      observer.next('This will not be emitted'); // Will not be reached
    }).pipe(
      catchError(err => {
        this.errorHandlingOutput = `Caught error: ${err}. Recovering with a default value.`;
        return of('Default Value after Error');
      })
    );
    this.subscriptions.add(error$.subscribe(
      val => this.errorHandlingOutput = val, // For the recovered value
      err => this.errorHandlingOutput = `This should not be called if catchError returns an observable: ${err}`, // Should not be called
      () => this.errorHandlingOutput += ' (Completed)'
    ));
  }

  initSubjects(): void {
    // Subject
    this.subscriptions.add(this.subject.subscribe(val => {
      this.subjectOutput.push(val);
      console.log('Subject Observer A:', val);
    }));
    this.subject.next(100);
    this.subject.next(200);

    this.subscriptions.add(this.subject.subscribe(val => { // Second subscriber, misses earlier values
      this.subjectOutput.push(val);
      console.log('Subject Observer B:', val);
    }));
    this.subject.next(300);

    // BehaviorSubject
    this.subscriptions.add(this.behaviorSubject.subscribe(val => {
      this.behaviorSubjectOutput.push(val);
      console.log('BehaviorSubject Observer A:', val);
    }));
    this.behaviorSubject.next('Updated Value 1 (BehaviorSubject)');

    this.subscriptions.add(this.behaviorSubject.subscribe(val => { // Gets the last emitted value upon subscription
      this.behaviorSubjectOutput.push(val);
      console.log('BehaviorSubject Observer B:', val);
    }));
    this.behaviorSubject.next('Updated Value 2 (BehaviorSubject)');

    // ReplaySubject
    this.subscriptions.add(this.replaySubject.subscribe(val => {
      this.replaySubjectOutput.push(val);
      console.log('ReplaySubject Observer A:', val);
    }));
    this.replaySubject.next('Msg 1 (Replay)');
    this.replaySubject.next('Msg 2 (Replay)');
    this.replaySubject.next('Msg 3 (Replay)'); // Msg 1 will be dropped due to buffer size 2

    this.subscriptions.add(this.replaySubject.subscribe(val => { // Gets buffered values upon subscription
      this.replaySubjectOutput.push(val);
      console.log('ReplaySubject Observer B:', val);
    }));
    this.replaySubject.next('Msg 4 (Replay)');
  }

  initUtilityOperators(): void {
    // debounceTime & distinctUntilChanged are used in switchMap example (searchInput)
    // Standalone example for clarity:
    const utilityInput$ = new Subject<string>();
    this.subscriptions.add(
      utilityInput$.pipe(
        tap(val => console.log('Utility - Raw input:', val)),
        debounceTime(400),
        distinctUntilChanged(),
        tap(val => console.log('Utility - Debounced & Distinct:', val))
      ).subscribe(val => {
        this.debounceOutput.push(val); // For debounceTime
        this.distinctUntilChangedOutput.push(val); // For distinctUntilChanged
      })
    );

    // Simulate input for debounce/distinct
    utilityInput$.next("a");
    utilityInput$.next("ab");
    utilityInput$.next("ab"); // distinctUntilChanged will filter this if previous was "ab"
    setTimeout(() => utilityInput$.next("abc"), 500); // after debounceTime
    setTimeout(() => utilityInput$.next("abc"), 600); // distinctUntilChanged will filter this
    setTimeout(() => utilityInput$.next("abcd"), 1200); // after debounceTime
  }


  // Methods to trigger subject emissions from template (optional)
  emitSubjectValue(): void {
    const randomVal = Math.floor(Math.random() * 1000);
    this.subject.next(randomVal);
  }

  emitBehaviorSubjectValue(): void {
    this.behaviorSubject.next(`New Behavior Value @ ${new Date().toLocaleTimeString()}`);
  }

  emitReplaySubjectValue(): void {
    this.replaySubject.next(`New Replay Value @ ${new Date().toLocaleTimeString()}`);
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    console.log('RxJS Examples: Unsubscribed from all observables.');
  }
}
