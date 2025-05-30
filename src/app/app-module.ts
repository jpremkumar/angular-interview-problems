import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { PerformanceOptimization } from './performance-optimization/performance-optimization';
import { ResponsiveDesign } from './responsive-design/responsive-design';
import { DynamicRendering } from './dynamic-rendering/dynamic-rendering';
import { MaterialIssues } from './material-issues/material-issues';
import { DynamicallyLoaded } from './dynamically-loaded/dynamically-loaded';
import { RxjsExamples } from './rxjs-examples/rxjs-examples';

@NgModule({
  declarations: [
    App,
    PerformanceOptimization,
    ResponsiveDesign,
    DynamicRendering,
    MaterialIssues,
    DynamicallyLoaded,
    RxjsExamples
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
