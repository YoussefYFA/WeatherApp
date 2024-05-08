import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ApiFetcherService {

  // private config: any;

  constructor(private http: HttpClient) {}

  // maybe try this in the future for a local file subscription
  // loadConfig(): Observable<any> {
  //   return this.http.get('/api/x');
  // }

  loadApiKey() {
    // Grab the API key from the environment file
    const envObject = {
      apiKey: environment.apiKey
    };

    console.log("envObject: ", envObject)
    console.log("envObject's ApiKey: ", envObject.apiKey)
    console.log("apiKey grabbed by AppInitializer")
    // Return the entire environment as an Observable, can access through envObject 
    return of(envObject);
  }

}
