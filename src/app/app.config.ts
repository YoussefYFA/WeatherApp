import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { Router, provideRouter } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { AuthInterceptorService } from './Services/auth-interceptor.service';
import { demoInterceptor } from './demo.interceptor';
import { AppInitService } from './Services/app-init.service';
import { environment } from '../environments/environment.development';
import { of } from 'rxjs';
import { AppInitializerComponent } from './app-initializer/app-initializer.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([demoInterceptor])),
    AppInitializerComponent,
    {
      provide: APP_INITIALIZER,
      useFactory: (AppInitializerComponent: AppInitializerComponent) => () =>
        AppInitializerComponent.initializeFunction(),
      deps: [AppInitializerComponent],
      multi: true,
    },
  ],
};

// export function appInitializerFunction(http: HttpClient) {
//   return (): Promise<any> =>
//     firstValueFrom(
//       http
//         .get("https://someUrl.com/api/user")
//         .pipe(tap(user => { ... }))
//     );
// }



//   console.log('envObject: ', envObject);
//   console.log("envObject's ApiKey: ", envObject.apiKey);
//   console.log('apiKey grabbed by AppInitializer');
//   // Return the entire environment as an Observable, can access through envObject
//   return of(envObject);
// }

// export function trialFunction() {
//   // Grab the API key from the environment file
//   const envObject = {
//     apiKey: environment.apiKey
//   };

//   if () {}

//   console.log("envObject: ", envObject)
//   console.log("envObject's ApiKey: ", envObject.apiKey)
//   console.log("apiKey grabbed by AppInitializer")
//   // Return the entire environment as an Observable, can access through envObject
//   return of(envObject);
// }
