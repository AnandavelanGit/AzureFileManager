import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { qaclass } from '../Models/ifile-data.model';

@Injectable({
  providedIn: 'root',
})
export class FilemanagerserviceService {
  apiUrl: string = '';
  loggedURLViaBrowser: string ='';

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

  GetAllSecretQuestions(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'GetSecretQuestions2');
  }

  CheckAnswers(QAs : Array<qaclass>): Observable<any> {
    // let formParams = new FormData();
    // formParams.append('file', QAs);
    return this.http.post(`${this.apiUrl + 'CheckAnswers'}`,QAs);

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
    console.log("inside apply loader");

    const loaderElem = document.getElementsByClassName('preloader');
    if (loaderElem) {
      console.log("inside loaderelement setup");
      const preLoader: any = loaderElem[0];
      preLoader.style.display = isLoaderNeedToApply ? 'block' : 'none';
      preLoader.style.opacity = 0.5;
      preLoader.style.zIndex = isLoaderNeedToApply ? 999 : -999;
    }
  }
}
