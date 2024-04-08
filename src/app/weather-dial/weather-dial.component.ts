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
  styleUrl: './weather-dial.component.scss'
})
export class WeatherDialComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document, private weatherService: APIserviceService) {}

 
  
  searchValue: string = '';
  inputValue: string = '';
  city = 'Greenwich';
  weatherData: any;
  units = 'metric';
  
  searchValue2: string = '';
  inputValue2: string = '';
  city2 = this.city;
  weatherData2: any;


  secondCityVisible = false;



// First Weather state
  ngOnInit(): void {
    this.weatherService.getForecast(this.city, this.units)
      .subscribe({
        next: (data) => {
          this.weatherData = data;
          this.weatherData2 = data;
          console.log('Received weather data:', this.weatherData);
        },
      });
  }

// check window width
isWindowWidthAbove800(): boolean {
  return this.document.defaultView!.innerWidth > 800;
}




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


  // Code for second city: add, remove, weather location 2, weathersearch2 
  addSecondCity() {
    const mainContainer = document.getElementById('MainContainer');
    if (mainContainer) {
      mainContainer.classList.add('container-2-cities');
      const secondTodaySection = mainContainer.querySelector('.second-today-section') as HTMLElement;
      if (secondTodaySection) {
        secondTodaySection.classList.remove('hidden');
      }
    }
    this.secondCityVisible = true;
  }
  
  removeSecondCity() {
    const mainContainer = document.getElementById('MainContainer');
    if (mainContainer) {
      mainContainer.classList.remove('container-2-cities');
      const secondTodaySection = mainContainer.querySelector('.second-today-section') as HTMLElement;
      if (secondTodaySection) {
        secondTodaySection.classList.add('hidden');
      }
    }
    this.secondCityVisible = false;
  }

  getWeatherBySearch2( searchValue2: string) {
    console.log(searchValue2);
    this.city2 = searchValue2;
    this.weatherService.getForecast(this.city2, this.units)
    .subscribe({
      next: (data) => {
        this.weatherData2 = data;
        this.city2 = this.weatherData2.city.name
        console.log('NEW weather data!!:', this.weatherData2);
        
      },
    });
  }

getWeatherByLocation2() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log

      this.weatherService.getLocationWeather(latitude, longitude, this.units)
        .subscribe((data) => {
          this.weatherData2 = data;
          this.city = this.weatherData2.city.name
          console.log('Location based weather data 2:', data);
        });
    });
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}





  // toggles between metric and imperial. Works for both city and city2

  toggleMetric() {
    console.log('toggling metric')
    if (this.units !== 'metric') {
      this.units = 'metric';
      document.getElementById('metric-toggle')!.classList.add('selected-button');
      document.getElementById('imperial-toggle')!.classList.remove('selected-button');
      this.weatherService.getForecast(this.city, this.units)
      .subscribe({
        next: (data) => {
          this.weatherData = data;
          console.log('Metric Data:', this.weatherData);
        },
        })
    }
  }
  
  toggleImperial() {
    console.log('toggling Imperial')
    if (this.units !== 'imperial') {
      this.units = 'imperial';
      document.getElementById('imperial-toggle')!.classList.add('selected-button');
      document.getElementById('metric-toggle')!.classList.remove('selected-button');
      this.weatherService.getForecast(this.city, this.units)
      .subscribe({
        next: (data) => {
          this.weatherData = data;
          console.log('Imperial Data:', this.weatherData);
        },
        })
    }
  }

  //week forecast section
  // this code section calculates the minimum and maximum temperature of each day based
  // on 8 different forecasts for the same day. The 8 part is due to the openWeatherAPI data structure
  
}
