import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialIssues } from './material-issues';

describe('MaterialIssues', () => {
  let component: MaterialIssues;
  let fixture: ComponentFixture<MaterialIssues>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialIssues]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialIssues);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
