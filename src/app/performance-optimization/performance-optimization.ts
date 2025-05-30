import { Component, OnInit } from '@angular/core';

interface Item {
  id: number;
  name: string;
  data: string; // To simulate more complex object
}

@Component({
  standalone: false,
  selector: 'app-performance-optimization',
  templateUrl: './performance-optimization.html',
  styleUrls: ['./performance-optimization.css']
})
export class PerformanceOptimization implements OnInit {
  itemsWithoutTrackBy: Item[] = [];
  itemsWithTrackBy: Item[] = [];
  nextId = 1;
  logCountWithoutTrackBy = 0;
  logCountWithTrackBy = 0;

  // Counter for *ngFor re-renders (for demonstration via console.log)
  // Note: This is a simplified way to observe. Real observation involves profiling.
  get renderLogWithoutTrackBy() {
    this.logCountWithoutTrackBy++;
    console.log(`Item rendered (No TrackBy): ${this.logCountWithoutTrackBy}`);
    return true;
  }

  get renderLogWithTrackBy() {
    this.logCountWithTrackBy++;
    console.log(`Item rendered (With TrackBy): ${this.logCountWithTrackBy}`);
    return true;
  }


  constructor() { }

  ngOnInit(): void {
    this.loadInitialItems();
  }

  loadInitialItems(): void {
    const initialData: Item[] = [];
    for (let i = 0; i < 5; i++) { // Start with a smaller list for clarity
      initialData.push({ id: this.nextId++, name: `Item ${this.nextId -1}`, data: Math.random().toString(36).substring(7) });
    }
    this.itemsWithoutTrackBy = [...initialData];
    this.itemsWithTrackBy = [...initialData];
    this.resetLogCounters();
  }

  addItem(): void {
    const newItem: Item = { id: this.nextId++, name: `Item ${this.nextId - 1}`, data: Math.random().toString(36).substring(7) };
    // For itemsWithoutTrackBy, Angular re-renders all items if the array reference changes.
    // To demonstrate the issue clearly, we create new arrays.
    this.itemsWithoutTrackBy = [...this.itemsWithoutTrackBy, newItem];
    this.itemsWithTrackBy = [...this.itemsWithTrackBy, newItem];
    this.resetLogCounters();
  }

  // Simulate updating data - e.g., fetching fresh data from a server
  // This often results in a new array instance.
  refreshData(): void {
    const refreshedData: Item[] = this.itemsWithTrackBy.map(item => ({
      ...item,
      data: Math.random().toString(36).substring(7) // Change some data
    }));
    // Shuffle to further demonstrate DOM element stability with trackBy
    // For a more direct comparison, we could update an item in place
    // but new array instances are common with state management.
    this.itemsWithoutTrackBy = [...refreshedData].sort(() => Math.random() - 0.5);
    this.itemsWithTrackBy = [...refreshedData].sort(() => Math.random() - 0.5);
    this.resetLogCounters();
  }

  // Modify one item's data without changing its ID or the array reference directly
  modifyOneItem(): void {
    if (this.itemsWithTrackBy.length > 0) {
      const itemToModify = this.itemsWithTrackBy[0];
      const modifiedItem = { ...itemToModify, data: `MODIFIED - ${Math.random().toString(36).substring(2)}` };

      // For itemsWithoutTrackBy: create a new array with the modified item
      const newItemsWithoutTrackBy = [...this.itemsWithoutTrackBy];
      const indexWithout = newItemsWithoutTrackBy.findIndex(i => i.id === itemToModify.id);
      if (indexWithout !== -1) {
        newItemsWithoutTrackBy[indexWithout] = modifiedItem;
        this.itemsWithoutTrackBy = newItemsWithoutTrackBy;
      }

      // For itemsWithTrackBy: create a new array with the modified item
      const newItemsWithTrackBy = [...this.itemsWithTrackBy];
      const indexWith = newItemsWithTrackBy.findIndex(i => i.id === itemToModify.id);
      if (indexWith !== -1) {
        newItemsWithTrackBy[indexWith] = modifiedItem;
        this.itemsWithTrackBy = newItemsWithTrackBy;
      }
      this.resetLogCounters();
    }
  }


  trackByItemId(index: number, item: Item): number {
    console.log(`TrackBy called for item ID: ${item.id}`);
    return item.id;
  }

  resetLogCounters(): void {
    this.logCountWithoutTrackBy = 0;
    this.logCountWithTrackBy = 0;
    // Add a small delay to allow the console to clear before new logs appear
    setTimeout(() => {
      console.clear();
      console.log("Console cleared for next operation. Observe re-render counts.");
    }, 100);
  }
}
