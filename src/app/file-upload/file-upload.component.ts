import { Component } from '@angular/core';
import { FilemanagerserviceService } from '../filemanagerservice.service';
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

  constructor(private Service: FilemanagerserviceService)
  {
     
  }

  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0]
    this.upload();
  }
  
  upload() {
    if (this.file) {
      this.filename = this.file.name;
      this.Service.UploadFile(this.file).subscribe(resp => {
        alert("Uploaded")
      })
    } else {
      alert("Please select a file first")
    }
  }

}
