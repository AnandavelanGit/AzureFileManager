import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FilemanagerserviceService {

  apiUrl: string = "";

  constructor( private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    console.log("hello" + environment.production);
  }

  GetFileList(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'GetFiles');
  }

  DownloadFile(blobName:string): Observable<any> {
   // return this.http.get<any>(this.apiUrl + 'DownloadBlob' + '/' + blobName, { responseType: 'blob'});
//https://stackoverflow.com/questions/52848018/download-xls-file-using-angular-unexpected-token-p-in-json-at-position-0-at-js
    return this.http.get(`${this.apiUrl + 'DownloadBlob' + '/' + blobName}`,{responseType:'blob',observe: 'response'});

  }

  UploadFile(file:File): Observable<any> {
    let formParams = new FormData();
    formParams.append('file', file)
     return this.http.post(`${this.apiUrl + 'UploadAFile'}`, formParams ); 
   }
  
}
