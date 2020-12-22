import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import {CommonService} from './common.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(private spinner: NgxSpinnerService,
              private commonService: CommonService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // All HTTP requests are going to go through this method
    this.spinner.show();
    this.commonService.isLoading.next(true);
    let authReq;

    authReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    return next.handle(authReq).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
          this.spinner.hide();
          this.commonService.isLoading.next(false);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          return throwError(error);
        } else {
          console.log("🚀 ~ file: http-interceptor.service.ts ~ line 35 ~ HttpInterceptorService ~ catchError ~ error", error)
          return throwError(error);
        }
      })
    );
  }
}
