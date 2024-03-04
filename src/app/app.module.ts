import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSortModule } from '@angular/material/sort';
import { FileManagerNavigationComponent } from './file-manager-navigation/file-manager-navigation.component';
import { MatSelectModule } from '@angular/material/select';
import { MSALGuardConfigFactory, MSALInstanceFactory, MSALInterceptorConfigFactory, MsalAuthenticationComponent } from './msal-authentication/msal-authentication.component';
import { RouteReuseStrategy } from '@angular/router';
import { MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MSAL_GUARD_CONFIG,
   MsalService, MsalGuard, MsalBroadcastService, MsalInterceptor,
    MsalRedirectComponent } from '@azure/msal-angular';
import { FileManagerInterceptor } from './Interceptors/file-manager-interceptor.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from './header/header.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SecretQuestionComponent } from './secret-question/secret-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecretQuestion2Component } from './secret-question2/secret-question2.component';


@NgModule({
  declarations: [
    AppComponent,
    FileManagerComponent,
    FileUploadComponent,
    FileManagerNavigationComponent,
    MsalAuthenticationComponent,
    HeaderComponent,
    SecretQuestionComponent,
    SecretQuestion2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule  
  ],
  providers: [
    {
    provide: MSAL_INSTANCE,
    useFactory: MSALInstanceFactory
  },
  {
    provide: MSAL_INTERCEPTOR_CONFIG,
    useFactory: MSALInterceptorConfigFactory
  },
  {
    provide: MSAL_GUARD_CONFIG,
    useFactory: MSALGuardConfigFactory
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  },
  MsalService, MsalGuard, MsalBroadcastService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: FileManagerInterceptor,
    multi: true
  },
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: HttpServiceInterceptor,
  //   multi: true
  // },
],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
