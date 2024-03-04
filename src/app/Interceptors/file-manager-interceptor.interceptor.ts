import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, finalize, map, throwError } from 'rxjs';
import { SpinnerserviceService } from '../Services/spinnerservice.service';
import { FilemanagerserviceService } from '../Services/filemanagerservice.service';

@Injectable()
export class FileManagerInterceptor implements HttpInterceptor {
  private incRequestCount = 0;
  
  constructor(private _loading: SpinnerserviceService, 
    private Service: FilemanagerserviceService
    ) {

      console.log("servicecount"+ this.incRequestCount);
    }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.incRequestCount += 1;
    // this._loading.setLoading(true, request.url);
    this.Service.applyLoaderOnApiCall(this.incRequestCount > 0);
    
    console.log("servicecount"+ this.incRequestCount);
    
    return next.handle(request)
      .pipe(
        
        finalize(() => {
          console.log("inside request interceptor finalize");
          this.incRequestCount = this.incRequestCount > 0 ? this.incRequestCount - 1 : 0;
          this.Service.applyLoaderOnApiCall(this.incRequestCount > 0);
      }),
        
        catchError((err) => {
        console.log("inside interceptor error handler");
        this.incRequestCount = this.incRequestCount > 0 ? this.incRequestCount - 1 : 0;
        this.Service.applyLoaderOnApiCall(this.incRequestCount > 0 );
        
        // this._loading.setLoading(false, request.url);
        return throwError(() => new Error(err));
      }))
      
      // .pipe(map<unknown, any>(       
      //   (evt: unknown) => {
      //     console.log("inside interceptor response");
      //   if (evt instanceof HttpResponse) {
      //     this._loading.setLoading(false, request.url);
      //   }
      //   return evt;
      // }));
    //  ));
     
  }
}
