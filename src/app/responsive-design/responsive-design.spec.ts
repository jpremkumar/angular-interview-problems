import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveDesign } from './responsive-design';

describe('ResponsiveDesign', () => {
  let component: ResponsiveDesign;
  let fixture: ComponentFixture<ResponsiveDesign>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponsiveDesign]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsiveDesign);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
