import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisBusinessComponent } from './analysis-business.component';

describe('AnalysisBusinessComponent', () => {
  let component: AnalysisBusinessComponent;
  let fixture: ComponentFixture<AnalysisBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
