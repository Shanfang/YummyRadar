import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisAreaComponent } from './analysis-area.component';

describe('AnalysisAreaComponent', () => {
  let component: AnalysisAreaComponent;
  let fixture: ComponentFixture<AnalysisAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
