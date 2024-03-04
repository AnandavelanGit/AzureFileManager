import { Component } from '@angular/core';
import { FilemanagerserviceService } from '../Services/filemanagerservice.service';
import {MatButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';



@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  //file: File = new File() ;
   file : any;
   filename : string = "";
   containerList:any [] =[];
 
 selectedContainer:string="";

  constructor(private Service: FilemanagerserviceService)
  {
    this.GetContainerList();
  }

  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0]
    this.upload();
  }

  GetContainerList(): void {
    this.Service.GetContainers().subscribe({
     next: (response: any) => {        
     this.containerList = response;    //this.FileList.push()       
   },    
   error: (e)=>{console.log("error " + e);},     
   complete: () => {
     console.log("inside complete");      
     console.log(this.containerList);
    }});
  }
  
  upload() {
    console.log("inside upload");
    console.log(this.selectedContainer);
    if (this.file) {
      this.filename = this.file.name;
      this.Service.UploadFile(this.file, this.selectedContainer).subscribe(resp => {
        alert("Uploaded")
      })
    } else {
      alert("Please select a file first")
    }
  }

}
