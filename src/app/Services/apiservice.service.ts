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

  HostHeaderName= 'WeatherAPIHOST'
  HostHeaderValue= 'api.openweathermap.org'

  APIKeyHeaderName= 'WeatherAPIKEY'
  APIKeyHeaderValue= 'f3c62032c630491cbb7ad5f30ecda711'

  constructor(private http: HttpClient) { }

  getWeather(city: string, units: string = 'metric') {
    const apiKey = 'f3c62032c630491cbb7ad5f30ecda711';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
    return this.http.get<any>(URL);
  }
  
  getForecast(city: string, units: string = 'metric') {
    const apiKey = 'f3c62032c630491cbb7ad5f30ecda711';
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`
    return this.http.get<any>(URL);
  }



}
