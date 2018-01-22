import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Model } from "./model";
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


const data: Model[] = [
  {label: "variant A", data: [65, 59, 80, 81, 56, 55, 40]},
  {label: "variant B", data: [28, 48, 40, 19, 86, 27, 90]}
];

const labels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


@Injectable()
export class PersonalizationDataService {

  mockData: Boolean = true;

  serviceUrl: string = "http://localhost:51085/api/graph";

  constructor( private http: HttpClient) { }

  getData(): Observable<Model[]> {
    if(this.mockData) {
      return of(data);
    }




    //return this.http.get()
  }

  getLabels(): Observable<string[]> {
    return of(labels);
  }


  getGraphData():Promise<any> {
    return this.http.get(this.serviceUrl).toPromise().then(response =>{
      return response;
    }).catch(error =>{
      console.log(error);
    });
  }


}
