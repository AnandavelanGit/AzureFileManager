import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileManagerNavigationComponent } from './file-manager-navigation/file-manager-navigation.component';
import { MsalAuthenticationComponent } from './msal-authentication/msal-authentication.component';


const routes: Routes = [
  {path: '  ', component: FileManagerNavigationComponent},
    {path: 'FileManagerRoot', component: FileManagerNavigationComponent},
    {
      path: 'msal-authentication',
      component: MsalAuthenticationComponent
    },
    {path: 'FileList', component: FileManagerComponent},
     {path: 'FileUpload', component: FileUploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
