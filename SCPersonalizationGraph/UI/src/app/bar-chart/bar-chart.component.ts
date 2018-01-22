import { Component, OnInit } from '@angular/core';
import { PersonalizationDataService } from "../personalization-data.service";
import { Model } from "../model";
import { ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart;

  public data:Array<any>;

  public labels: Array<any> = []; 
  public options: any = {
    responsive: false,
    showLines: true,
    legend: {
      display: true,
    },
    scales: {
      xAxes: [{
          stacked: true
      }]
    }
  };


  constructor(private dataService: PersonalizationDataService) { }

  ngOnInit() {

    this.dataService.getGraphData().then(data => {
      console.log(data);
      let newData = this.restructureData(data.summaryByRuleset);
      this.data = newData;
    });
  }

  // todo: move to service
  restructureData(data:any): any {
    let d1 = {};
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      if(d1[d.ruleSetId] == undefined) {
        d1[d.ruleSetId]  = {};
      }
      if(d1[d.ruleSetId][d.testSetId] == undefined) {
        d1[d.ruleSetId][d.testSetId]  = {};
      }

      d1[d.ruleSetId][d.testSetId]  = {
        totalVisits: d.totalVisits,
        totalVisitors: d.totalVisitors,
        totalValue: d.totalValue,
        date: d.date
      };
    }

    let dataset = [];

    let keys = Object.keys(d1);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      
      const s = d1[key];
      let testKeys = Object.keys(s);
      for (let j = 0; j < testKeys.length; j++) {
        const testKey = testKeys[j];
        let series = {
          stack: key,
          label: testKey,
          data: [{x:s[testKey].date, y: s[testKey].totalValue }]
        };
        dataset.push(series);
      }
      this.labels.push(key);
    }

    console.log(d1);
    return dataset;
  }

  plotData(data: any) {
    let dates: string[] = [];
    let visits = {label: "Total Visits", data: []};
    let visitors = {label: "Total Visitors", data: []};
    let values = {label: "Total Values", data: []};
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      dates.push(d.date);
      visits.data.push(d.totalVisits);
      visitors.data.push(d.totalVisitors);
      values.data.push(d.totalValue);
    }


    this.data = [values, visits, visitors];
    this.labels = dates;

    //workaround for x-axis update
    this.chart.labels = dates;
    //this.chart.chart.update();
    this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
  }


}
