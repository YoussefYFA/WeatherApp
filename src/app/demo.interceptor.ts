import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';

export const demoInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Interceptor WORKS!")
  console.log("environment:", environment)

  // const apiKey = environment.apiKey;

  const apiKey = 'c424197e461c205947cfea118570b17d'
  const authReq = req.clone({
  setParams: {
  appid: apiKey

}
});
  
  return next(authReq);
};
