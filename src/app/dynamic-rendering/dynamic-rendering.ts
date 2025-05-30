import { Component, ViewChild, ViewContainerRef, ComponentRef, OnDestroy } from '@angular/core';
import { DynamicallyLoaded } from '../dynamically-loaded/dynamically-loaded'; // Updated import

@Component({
  standalone: false,
  selector: 'app-dynamic-rendering',
  templateUrl: './dynamic-rendering.html',
  styleUrls: ['./dynamic-rendering.css']
})
export class DynamicRendering implements OnDestroy {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true }) dynamicComponentContainer!: ViewContainerRef;
  private componentRef: ComponentRef<DynamicallyLoaded> | null = null;

  constructor() { }

  loadDynamicComponent(): void {
    this.clearDynamicComponent();

    // Create the component
    this.componentRef = this.dynamicComponentContainer.createComponent(DynamicallyLoaded);

    // You can pass inputs to the dynamically loaded component like this:
    if (this.componentRef) {
      this.componentRef.instance.inputData = "This data was passed from the parent!";
      this.componentRef.instance.someEvent.subscribe((eventData: string) => {
        console.log('Event from dynamically loaded component:', eventData);
        alert(`Event received from dynamic component: ${eventData}`);
      });
    }
  }

  clearDynamicComponent(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
    this.dynamicComponentContainer.clear();
  }

  ngOnDestroy(): void {
    this.clearDynamicComponent(); // Ensure cleanup when the component is destroyed
  }
}
