import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APIserviceService } from '../Services/apiservice.service';
import { FormsModule } from '@angular/forms';
// import * as jsonData from '../assets/weatherDataExample.json';

@Component({
  selector: 'app-weather-dial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather-dial.component.html',
  styleUrl: './weather-dial.component.scss'
})
export class WeatherDialComponent implements OnInit {

  constructor(private weatherService: APIserviceService) {}

  
  searchValue: string = '';
  inputValue: string = '';
  city = 'Greenwich';
  weatherData: any;
  units = 'metric';


  getWeatherBySearch( searchValue: string) {
    console.log(searchValue);
    this.city = searchValue;
    this.weatherService.getForecast(this.city, this.units)
    .subscribe({
      next: (data) => {
        this.weatherData = data;
        this.city = this.weatherData.city.name
        console.log('NEW weather data!!:', this.weatherData);
        
      },
    });
    
  }

getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log

      this.weatherService.getLocationWeather(latitude, longitude, this.units)
        .subscribe((data) => {
          this.weatherData = data;
          this.city = this.weatherData.city.name
          console.log('Location based weather data:', data);
        });
    });
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}

  ngOnInit(): void {
    //sets base weather
    this.weatherService
      .getForecast(this.city, this.units)
      .subscribe({
        next: (data) => {
          this.weatherData = data;
          console.log('Received weather data:', this.weatherData);
          
        },
      });
  }

  getWeatherIcon(weather: string): string {
    const lowercaseWeather = weather.toLowerCase();
    
    if (!weather) {
      return 'default-icon'; // Return a default image if weather is undefined
    }
    
    const weatherIconMap: any = {
      'clear': 'Sun icons2',
      'rain': 'Rainy cloud icons2',
      'snow': 'Snow cloud icons2',
      'clouds': 'Cloud icons2',
      'drizzle': 'Icons of the Sun behind the Rainy Cloud',
      'thunderstorm': 'Heavy rain icons2'
    };
    
    
    return weatherIconMap[lowercaseWeather] || 'Rainbow Icons Behind Clouds'; // default-icon can be a placeholder image
  }

  //week forecast section
  // this code section calculates the minimum and maximum temperature of each day based
  // on 8 different forecasts for the same day. The 8 part is due to the openWeatherAPI data structure
  
}
