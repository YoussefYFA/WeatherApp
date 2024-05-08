import { Injectable } from '@angular/core';
import { ApiFetcherService } from './api-fetcher.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(private apiFetcher: ApiFetcherService) { }
   initializeFunction() {
    console.log("app-initializing")
    // return this.apiFetcher.loadApiKey().toPromise();
  }
}
