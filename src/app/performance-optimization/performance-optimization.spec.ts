import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceOptimization } from './performance-optimization';

describe('PerformanceOptimization', () => {
  let component: PerformanceOptimization;
  let fixture: ComponentFixture<PerformanceOptimization>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformanceOptimization]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceOptimization);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
