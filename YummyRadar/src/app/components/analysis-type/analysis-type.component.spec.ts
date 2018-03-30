import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisTypeComponent } from './analysis-type.component';

describe('AnalysisTypeComponent', () => {
  let component: AnalysisTypeComponent;
  let fixture: ComponentFixture<AnalysisTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
