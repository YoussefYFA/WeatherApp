import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APIserviceService } from '../Services/apiservice.service';

@Component({
  selector: 'app-weather-dial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-dial.component.html',
  styleUrl: './weather-dial.component.scss'
})
export class WeatherDialComponent implements OnInit {

  constructor(private weatherService: APIserviceService) {}

  city = 'Cairo';
  weatherData: any;

  ngOnInit(): void {
    this.weatherService
      .getWeather(this.city)
      .subscribe({
        next: (data) => {
          this.weatherData = data;
          console.log('Received weather data:', this.weatherData);
        },
      });
  }

}
