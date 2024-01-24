import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
const routes: Routes = [
    {
    path: '', component: FileManagerComponent,
     },{path: 'FileList', component: FileManagerComponent},
     {path: 'FileUpload', component: FileUploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
