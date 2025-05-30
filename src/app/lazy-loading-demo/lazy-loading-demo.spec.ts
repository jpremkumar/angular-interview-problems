import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyLoadingDemo } from './lazy-loading-demo';

describe('LazyLoadingDemo', () => {
  let component: LazyLoadingDemo;
  let fixture: ComponentFixture<LazyLoadingDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LazyLoadingDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LazyLoadingDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
