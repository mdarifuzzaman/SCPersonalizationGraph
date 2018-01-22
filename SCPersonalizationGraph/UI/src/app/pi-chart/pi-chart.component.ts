import { Component, OnInit } from '@angular/core';
import { PersonalizationDataService } from '../personalization-data.service';

@Component({
  selector: 'app-pi-chart',
  templateUrl: './pi-chart.component.html',
  styleUrls: ['./pi-chart.component.css']
})
export class PiChartComponent implements OnInit {

  public pichartdata:number[] = [20, 40];
  public pieChartType:string = 'doughnut';
  public pichartlabels:string[] = [];

  public options: any = {
    responsive: false    
  };

  constructor(private dataService: PersonalizationDataService) { }

  ngOnInit() {
    this.dataService.getGraphData().then(response => {      
      this.pichartdata = [];
      let data:any = response.testValuePercentage;
      let i = 1;
      data.forEach(val => {
        this.pichartdata.push(Math.ceil(val.totalValue/val.totalVisits));
        this.pichartlabels.push(val.ruleSetId);
        i++;
      });      
    });
  }

}
