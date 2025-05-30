import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyLoadingDemoRoutingModule } from './lazy-loading-demo-routing-module';
import { LazyLoadingDemo } from './lazy-loading-demo';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    LazyLoadingDemo
  ],
  imports: [
    CommonModule,
    LazyLoadingDemoRoutingModule,
    MatCardModule
  ]
})
export class LazyLoadingDemoModule { }
