import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicRendering } from './dynamic-rendering';

describe('DynamicRendering', () => {
  let component: DynamicRendering;
  let fixture: ComponentFixture<DynamicRendering>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicRendering]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicRendering);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
