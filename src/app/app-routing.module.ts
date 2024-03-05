import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileManagerNavigationComponent } from './file-manager-navigation/file-manager-navigation.component';
import { MsalAuthenticationComponent } from './msal-authentication/msal-authentication.component';
import { environment } from 'src/environments/environment';
import { SecretQuestionComponent } from './secret-question/secret-question.component';
import { SecretQuestion2Component } from './secret-question2/secret-question2.component';
import { AuthorizeGuard } from 'src/AuthGuard/authorize.guard';
// import { SecretQuestionComponent } from './secret-question/secret-question.component';


const routes: Routes = [
  { path: '', component: FileManagerNavigationComponent},
  {path: 'SecretQuestion2', component: SecretQuestion2Component},
  {path: 'SecretQuestion', component: SecretQuestionComponent},
  { path: 'FileManagerRoot', component: FileManagerNavigationComponent, canActivate: [AuthorizeGuard]  },
  {
    path: 'msal-authentication',
    component: MsalAuthenticationComponent
  },
  { path: 'FileList', component: FileManagerComponent, canActivate: [AuthorizeGuard]  },
  { path: 'FileUpload', component: FileUploadComponent, canActivate: [AuthorizeGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

