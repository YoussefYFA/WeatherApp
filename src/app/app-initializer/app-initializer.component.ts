import { Component } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-app-initializer',
  standalone: true,
  imports: [],
  templateUrl: './app-initializer.component.html',
  styleUrl: './app-initializer.component.scss'
})
export class AppInitializerComponent {

  myLocalUrl: any;


  constructor(private http: HttpClient) {
  }

initializeFunction() : Promise<any> {
  return new Promise((resolve, reject) => {
  
    this.myLocalUrl = 'src/app';
  
    // this.http.get(`${this.myLocalUrl}/${environment.apiKey}`)
    // this.http.get("../src/app/myappconfig.json")
    this.http.get("http://localhost:4200/myappconfig.json")
    // this.http.get("https://www.google.com/")
    // this.http.get("../myappconfig.json")
    // this.http.get("https://fakestoreapi.com/products")
    .subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
  
    })


  });
}
}
