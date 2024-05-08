import { HttpInterceptorFn, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { inject } from "@angular/core/testing";



export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler){
        console.log('Auth Interceptor called!');
        
        const apiKey = 'apiKeyHere';
        const authReq = req.clone({
        setParams: {
        appid: apiKey
      
    }
  });
  return next.handle(authReq);
}}