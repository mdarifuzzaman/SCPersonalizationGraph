import { Component, OnInit } from '@angular/core';
import { PersonalizationDataService } from "../personalization-data.service";
import { Model } from "../model";
import { ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-personalization-chart',
  templateUrl: './personalization-chart.component.html',
  styleUrls: ['./personalization-chart.component.css']
})
export class PersonalizationChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart;
  // lineChart
  public lineChartData:Array<any> = [
    {label: "variant A", data: [65, 59, 80, 81, 56, 55, 40]},
    {label: "variant B", data: [28, 48, 40, 19, 86, 27, 90]}
  ];

  public lineChartLabels: Array<any>; 
  public lineChartOptions: any = {
    responsive: false,
    showLines: true,
    legend: {
      display: true,
      labels: {
          // fontColor: 'rgb(255, 99, 132)'
      }
    }
  };
  
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  public graphdata: any;

  constructor(private dataService: PersonalizationDataService) { }

  ngOnInit() {
    // this.getData();
    //this.dataService.getLabels().subscribe(l => this.lineChartLabels = l);

    this.dataService.getGraphData().then(data => {
      console.log(data);

      let summaryData = data.summaryData;
      this.plotSummary(summaryData);
    })
  }

  plotSummary(summaryData: any) {
    let dates: string[] = [];
    let visits = {label: "Total Visits", data: []};
    let visitors = {label: "Total Visitors", data: []};
    let values = {label: "Total Values", data: []};
    for (let i = 0; i < summaryData.length; i++) {
      const d = summaryData[i];
      dates.push(d.date);
      visits.data.push(d.totalVisits);
      visitors.data.push(d.totalVisitors);
      values.data.push(d.totalValue);
    }


    this.lineChartData = [values, visits, visitors];
    this.lineChartLabels = dates;

    //workaround for x-axis update
    this.chart.labels = dates;
    //this.chart.chart.update();
    this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
  }


  plotByRuleset(rulesetData: any) {
    let dates: string[] = [];
    let visits = {label: "Total Visits", data: []};
    let visitors = {label: "Total Visitors", data: []};
    let values = {label: "Total Values", data: []};
    for (let i = 0; i < rulesetData.length; i++) {
      const d = rulesetData[i];
      dates.push(d.date);
      visits.data.push(d.totalVisits);
      visitors.data.push(d.totalVisitors);
      values.data.push(d.totalValue);
    }


    this.lineChartData = [values, visits, visitors];
    this.lineChartLabels = dates;

    //workaround for x-axis update
    this.chart.labels = dates;
    //this.chart.chart.update();
    this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
  }

  getData() {
    this.dataService.getData().subscribe(data => this.lineChartData = data);
  }




}
