# Angular Interview Problems

This project is designed to help interview candidates with 4-6 years of Angular experience prepare for technical interviews. It includes various problem statements and scenarios focusing on key Angular concepts and best practices.

## Project Goal

To provide a hands-on practice environment covering:

- Performance Optimization (e.g., `trackBy`, Change Detection strategies)
- Responsive Design techniques
- Dynamic Component Rendering
- Lazy Loading of modules
- Common Angular Material UI issues (styling, custom validation, accessibility)

Each section includes a practical demonstration and relevant interview questions.

## Core Technologies

- Angular 18 (using `NgModule`s, not standalone components)
- Angular CLI
- Angular Material
- TypeScript
- CSS (with Flexbox for responsive layouts)

## Application Structure

The application is divided into modules and components, each addressing a specific interview topic:

- **App Shell:** Provides the main navigation using Angular Material tabs.
- **Performance Optimization:** Demonstrates `trackBy` with `ngFor` and discusses Change Detection.
  - Route: `/performance`
  - Component: `PerformanceOptimizationComponent`
- **Responsive Design:** Shows a responsive card layout using Flexbox and media queries.
  - Route: `/responsive`
  - Component: `ResponsiveDesignComponent`
- **Dynamic Rendering:** Illustrates how to load components dynamically, pass inputs, and handle outputs.
  - Route: `/dynamic-rendering`
  - Component: `DynamicRenderingComponent` (hosts `DynamicallyLoadedComponent`)
- **Lazy Loading:** A dedicated module (`LazyLoadingDemoModule`) loaded on demand.
  - Route: `/lazy` (loads `LazyLoadingDemoModule` which then routes to `LazyLoadingDemoComponent`)
  - Component: `LazyLoadingDemoComponent`
- **Material UI Issues:** Covers common challenges like style overriding and custom form validation with Angular Material components.
  - Route: `/material-issues`
  - Component: `MaterialIssuesComponent`

## Getting Started

1. **Prerequisites:**
   - Node.js (latest LTS version recommended)
   - Angular CLI (`npm install -g @angular/cli`)

2. **Clone the repository (if applicable):**

   ```bash
   git clone <repository-url>
   cd angular-interview-problems
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Run the development server:**

   ```bash
   ng serve -o
   ```

   Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running Unit Tests

Run `ng test` to execute the unit tests via Karma. (Note: Test specs were skipped for some generated components for brevity in this exercise).

## Further Help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Copilot Instructions

Instructions for GitHub Copilot on how to assist with this project are located in `.github/copilot-instructions.md`.
