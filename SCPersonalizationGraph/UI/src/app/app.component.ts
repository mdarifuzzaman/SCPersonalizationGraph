import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  personalizationChart = false;
  barChart = false;
  piChart = false;

  doPersonalization(){
    this.personalizationChart = true;
    this.barChart = false;
    this.piChart = false;
  }

  doBar(){
    this.personalizationChart = false;
    this.barChart = true;
    this.piChart = false;
  }

  doPi(){
    this.personalizationChart = false;
    this.barChart = false;
    this.piChart = true;
  }
}
