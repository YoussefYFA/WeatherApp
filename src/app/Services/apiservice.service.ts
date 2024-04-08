import { Injectable, Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { WeatherDataResponse } from '../Interfaces/weather.interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class APIserviceService {
  // definitions section
  // can be replaced by environments file
  weatherApiBaseUrl='http://api.openweathermap.org/data/2.5/forecast'

  apikey= 'InsertAPIKeyHere'
  daycount = '48';

  constructor(private http: HttpClient) { }

  
  getForecast(city: string, units: string) {

    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${this.daycount}&appid=${this.apikey}&units=${units}`
  
    return this.http.get<any>(URL);
  }

  getLocationWeather(latitude: number, longitude: number, units: string) {
  
    const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=${this.daycount}&appid=${this.apikey}&units=${units}`;

    return this.http.get<any>(URL);
  }


}
