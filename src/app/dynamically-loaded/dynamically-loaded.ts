import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dynamically-loaded',
  standalone: false,
  templateUrl: './dynamically-loaded.html',
  styleUrls: ['./dynamically-loaded.css']
})
export class DynamicallyLoaded {
  @Input() inputData: string = "Default Input Data";
  @Output() someEvent = new EventEmitter<string>();

  constructor() { }

  emitEvent(): void {
    const eventPayload = `Event from DynamicallyLoadedComponent at ${new Date().toLocaleTimeString()}`;
    this.someEvent.emit(eventPayload);
  }
}
