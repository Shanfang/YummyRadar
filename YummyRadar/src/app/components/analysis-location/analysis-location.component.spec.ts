import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisLocationComponent } from './analysis-location.component';

describe('AnalysisLocationComponent', () => {
  let component: AnalysisLocationComponent;
  let fixture: ComponentFixture<AnalysisLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
