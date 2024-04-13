import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APIserviceService } from '../Services/apiservice.service';
import { FormsModule } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

// import * as jsonData from '../assets/weatherDataExample.json';

@Component({
  selector: 'app-weather-dial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather-dial.component.html',
  styleUrl: './weather-dial.component.scss',
})
export class WeatherDialComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private weatherService: APIserviceService
  ) {}

  searchValue: string = '';
  searchValue2: string = '';

  inputValue: string = '';
  inputValue2: string = '';

  city = 'Greenwich';
  city2 = this.city;

  weatherData: any;
  weatherData2: any;

  transformedData: any;

  units = 'metric';


  


  secondCityVisible = false;

  // First Weather state
  ngOnInit(): void {
    this.weatherService.getForecast(this.city, this.units).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.weatherData2 = data;
        console.log('Received weather data:', this.weatherData);

        this.transformedData = this.transformForecastData(data);
        console.log('Transformed weather data:', this.transformedData);

      },
    });
  }

  // check window width
  isWindowWidthAbove800(): boolean {
    return this.document.defaultView!.innerWidth > 800;
  }

  getWeatherBySearch(searchValue: string) {
    console.log(searchValue);
    this.city = searchValue;
    this.weatherService.getForecast(this.city, this.units).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.city = this.weatherData.city.name;
        console.log('NEW weather data!!:', this.weatherData);

        this.transformedData = this.transformForecastData(data);
        console.log('Transformed weather data:', this.transformedData);
      },
    });
  }

  getWeatherByLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log;

        this.weatherService
          .getLocationWeather(latitude, longitude, this.units)
          .subscribe((data) => {
            this.weatherData = data;
            this.city = this.weatherData.city.name;
            console.log('Location based weather data:', data);

            this.transformedData = this.transformForecastData(data);
            console.log('Transformed weather data:', this.transformedData);
          });
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  getWeatherIcon(weather: string): string {
    const lowercaseWeather = weather.toLowerCase();

    if (!weather) {
      return 'default-icon'; // Return a default image if weather is undefined
    }
    const weatherIconMap: any = {
      clear: 'Sun icons2',
      rain: 'Rainy cloud icons2',
      snow: 'Snow cloud icons2',
      clouds: 'Cloud icons2',
      drizzle: 'Icons of the Sun behind the Rainy Cloud',
      thunderstorm: 'Heavy rain icons2',
    };
    return weatherIconMap[lowercaseWeather] || 'Rainbow Icons Behind Clouds'; // default-icon can be a placeholder image
  }

  // Code for second city: add, remove, weather location 2, weathersearch2
  addSecondCity() {
    const mainContainer = document.getElementById('MainContainer');
    if (mainContainer) {
      mainContainer.classList.add('container-2-cities');
      const secondTodaySection = mainContainer.querySelector(
        '.second-today-section'
      ) as HTMLElement;
      if (secondTodaySection) {
        secondTodaySection.classList.remove('hidden');
      }
    }
    this.secondCityVisible = true;

    const weekSectionBody = document.querySelector(
      '.week-section-body'
    ) as HTMLElement;
    if (weekSectionBody) {
      weekSectionBody.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr';
    }
  }

  removeSecondCity() {
    const mainContainer = document.getElementById('MainContainer');
    if (mainContainer) {
      mainContainer.classList.remove('container-2-cities');
      const secondTodaySection = mainContainer.querySelector(
        '.second-today-section'
      ) as HTMLElement;
      if (secondTodaySection) {
        secondTodaySection.classList.add('hidden');
      }
    }
    this.secondCityVisible = false;

    const weekSectionBody = document.querySelector(
      '.week-section-body'
    ) as HTMLElement;
    if (weekSectionBody) {
      weekSectionBody.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr';
    }
  }

  getWeatherBySearch2(searchValue2: string) {
    console.log(searchValue2);
    this.city2 = searchValue2;
    this.weatherService.getForecast(this.city2, this.units).subscribe({
      next: (data) => {
        this.weatherData2 = data;
        this.city2 = this.weatherData2.city.name;
        console.log('NEW weather data!!:', this.weatherData2);
      },
    });
  }

  getWeatherByLocation2() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.weatherService
          .getLocationWeather(latitude, longitude, this.units)
          .subscribe((data) => {
            this.weatherData2 = data;
            this.city2 = this.weatherData2.city.name;
            console.log('Location based weather data 2:', data);
          });
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  // toggles between metric and imperial. Works for both city and city2

  toggleMetric() {
    console.log('toggling metric');
    if (this.units !== 'metric') {
      this.units = 'metric';
      document
        .getElementById('metric-toggle')!
        .classList.add('selected-button');
      document
        .getElementById('imperial-toggle')!
        .classList.remove('selected-button');
      this.weatherService.getForecast(this.city, this.units).subscribe({
        next: (data) => {
          this.weatherData = data;
          console.log('Metric Data:', this.weatherData);

          this.transformedData = this.transformForecastData(data);
          console.log('Transformed weather data:', this.transformedData);
        },
      });
    }
  }

  toggleImperial() {
    console.log('toggling Imperial');
    if (this.units !== 'imperial') {
      this.units = 'imperial';
      document
        .getElementById('imperial-toggle')!
        .classList.add('selected-button');
      document
        .getElementById('metric-toggle')!
        .classList.remove('selected-button');
      this.weatherService.getForecast(this.city, this.units).subscribe({
        next: (data) => {
          this.weatherData = data;
          console.log('Imperial Data:', this.weatherData);

          this.transformedData = this.transformForecastData(data);
          console.log('Transformed weather data:', this.transformedData);
        },
      });
    }
  }

  // week forecast section
  // this code section calculates the minimum and maximum temperature of each day based
  // on 8 different forecasts for the same day. The 8 part is due to the openWeatherAPI data structure

 transformForecastData(weatherData: any) {

  
    const transformedData: any = [];

    console.log("data transforming...");

    weatherData.list.forEach((dataPoint: any) => {
      // Extract the date from the `dt_txt` property
      const date = new Date(dataPoint.dt_txt);
  
      // Get the day of the week (0 for Sunday, 6 for Saturday)
      const dayOfWeek = date.getDay();

      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

      const main = dataPoint.weather[0].main;
  
      // Find the object in the `transformedData` array that corresponds to the current day of the week
      let dayObject = transformedData.find((obj: any) => obj.day === dayOfWeek);
  
      // If no object exists for the current day, create a new one, and
      // set low bar for the highest and lowest temp
      if (!dayObject) {
        dayObject = {
          day: dayOfWeek,
          dayname: dayName,
          highest_max_temp: -Infinity,
          lowest_min_temp: Infinity,
          times: [],
          main: main,
        };
        transformedData.push(dayObject);
      }
      
      dayObject.times.push(dataPoint.dt_txt);
      // compares current highest max_temp (-infinity) with current loop max_temp, and 
      // sets new value for highest_max_temp
      dayObject.highest_max_temp = Math.max(dayObject.highest_max_temp, dataPoint.main.temp_max);
      dayObject.lowest_min_temp = Math.min(dayObject.lowest_min_temp, dataPoint.main.temp_min);
    });
  
    return transformedData;
    
  }

}
