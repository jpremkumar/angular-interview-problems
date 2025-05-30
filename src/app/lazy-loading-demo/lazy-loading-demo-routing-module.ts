import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyLoadingDemo } from './lazy-loading-demo';

const routes: Routes = [{ path: '', component: LazyLoadingDemo }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyLoadingDemoRoutingModule { }
