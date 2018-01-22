import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';


import { AppComponent } from './app.component';
import { PersonalizationChartComponent } from './personalization-chart/personalization-chart.component';
import { PersonalizationDataService } from './personalization-data.service';
import { Http } from '@angular/http';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PiChartComponent } from './pi-chart/pi-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonalizationChartComponent,
    BarChartComponent,
    PiChartComponent,
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [PersonalizationDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
