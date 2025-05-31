import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerformanceOptimization } from './performance-optimization/performance-optimization'; // Corrected: PerformanceOptimization
import { ResponsiveDesign } from './responsive-design/responsive-design'; // Corrected: ResponsiveDesign
import { DynamicRendering } from './dynamic-rendering/dynamic-rendering'; // Corrected: DynamicRendering
import { MaterialIssues } from './material-issues/material-issues'; // Corrected: MaterialIssues
import { RxjsExamples } from './rxjs-examples/rxjs-examples'; // Corrected: RxjsExamples
import { TypescriptConcepts } from './typescript-concepts/typescript-concepts';
import { OopConcepts } from './oop-concepts/oop-concepts';

const routes: Routes = [
  { path: 'performance', component: PerformanceOptimization },
  { path: 'responsive', component: ResponsiveDesign },
  { path: 'dynamic-rendering', component: DynamicRendering },
  { path: 'material-issues', component: MaterialIssues },
  { path: 'rxjs-examples', component: RxjsExamples },
  { path: 'typescript-concepts', component: TypescriptConcepts },
  { path: 'oop-concepts', component: OopConcepts },
  // {
  //   path: 'lazy',
  //   loadChildren: () =>
  //     import('./lazy-loading-demo/lazy-loading-demo.module').then(
  //       (m) => m.LazyLoadingDemoModule
  //     ),
  // },
  { path: '', redirectTo: '/performance', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
