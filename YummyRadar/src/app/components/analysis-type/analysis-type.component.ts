import { Component, OnInit } from '@angular/core';
import { AnalysisService } from '../../Services/analysis.service';

@Component({
  selector: 'app-analysis-type',
  templateUrl: './analysis-type.component.html',
  styleUrls: ['./analysis-type.component.css'],
})
export class AnalysisTypeComponent implements OnInit {

  constructor(private analysisService: AnalysisService) { }

  ngOnInit() {
  }

}
