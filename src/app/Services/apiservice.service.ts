import { Injectable, Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { WeatherDataResponse } from '../Interfaces/weather.interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface DailyForecast {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: { main: string; icon: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class APIserviceService {
  // definitions section
  // I should later replace this with environments file
  weatherApiBaseUrl='http://api.openweathermap.org/data/2.5/'
  weatherApiBaseForecastUrl='http://api.openweathermap.org/data/2.5/forecast'


  daycount = '48';

  constructor(private http: HttpClient) { }

  
  getForecast(city: string, units: string) {

    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${this.daycount}&units=${units}`
  
    return this.http.get<any>(URL);
  }

  getLocationWeather(latitude: number, longitude: number, units: string) {
  
    const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=${this.daycount}&units=${units}`;

    return this.http.get<any>(URL);
  }


}
