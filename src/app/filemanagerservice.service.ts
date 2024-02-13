import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilemanagerserviceService {
  apiUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    console.log('hello' + environment.production);
  }

  GetEmployeeProfile(): Observable<any> {
    return this.http.get<any>(environment.graphApi);
  }

  GetFileList(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'GetFiles');
  }

  GetFileListForContainer(container: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl + 'GetFiles' + '/' + container}`);
  }

  GetContainers(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'GetContainers');
  }

  DownloadFile(blobName: string): Observable<any> {
    // return this.http.get<any>(this.apiUrl + 'DownloadBlob' + '/' + blobName, { responseType: 'blob'});
    //https://stackoverflow.com/questions/52848018/download-xls-file-using-angular-unexpected-token-p-in-json-at-position-0-at-js
    return this.http.get(`${this.apiUrl + 'DownloadBlob' + '/' + blobName}`, {
      responseType: 'blob',
      observe: 'response',
    });
  }

  UploadFile(file: File, container: string): Observable<any> {
    let formParams = new FormData();
    formParams.append('file', file);
    formParams.append('container', container);

    return this.http.post(`${this.apiUrl + 'UploadAFile'}`, formParams);
  }

  applyLoaderOnApiCall(isLoaderNeedToApply: boolean): void {
    const loaderElem = document.getElementsByClassName('preloader');
    if (loaderElem) {
      const preLoader: any = loaderElem[0];
      preLoader.style.display = isLoaderNeedToApply ? 'block' : 'none';
      preLoader.style.opacity = 0.5;
      preLoader.style.zIndex = isLoaderNeedToApply ? 999 : -999;
    }
  }
}
