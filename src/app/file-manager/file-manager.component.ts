import { Component } from '@angular/core';
import { Timestamp } from 'rxjs';
import { FileDataToDisplay, IFileData } from '../ifile-data.model';
import { FilemanagerserviceService } from '../filemanagerservice.service';
import { Observable, of, pipe} from 'rxjs';
import { map, filter, tap } from 'rxjs/operators'


@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})

export class FileManagerComponent {

  //FileList: IFileData[]=[];

  filelisttemp:any []= [];
  //FileList: any[]=[];
 
   displayedColumns: string[] = ['filename', 'size(KB)','uploadedby', 'uploadedDate'];

   ngOnInit(): void {

    this.GetFileList();

    var obj = this.filelisttemp;
    
    //console.log(this.FileList);

   }
   constructor(private Service: FilemanagerserviceService)
   {
      
   }
   onCellClick(filename:string)
   {

    console.log(filename);

    this.DownloadFile(filename);    

    // let isdownloadfile = this.DownloadFile(filename);    
    // if (isdownloadfile)
    // alert("downloaded successfully");
   }

   DownloadFile(filename:string):boolean {
    var isdownloadsuccess: boolean = false;
    console.log("inside DownloadFile");
    this.Service.DownloadFile(filename).subscribe(
       (response: any) => {
       
        console.log(response);
        const contentDisposition = response.headers.get('Content-Disposition');
        const blob = new Blob([response.body], { type: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, image/png, image/jpeg, .docx, .pptx' });
        const url = window.URL.createObjectURL(blob);
  console.log(url);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        isdownloadsuccess = true;
      });
      
      // error: (e)=>{
      //   Object.keys(e).forEach(element => {
      //     console.log(element +":" + e[element]);
      //    });
        
      //   console.log("error " + e.error[Object.keys(e.error)[0]]);
      //   // console.log("e.message " + e.message);
      
      // }, 
      
      // complete: () => { console.log("file downloaded");}
    // });



    
      return isdownloadsuccess;
   }

   GetFileList(): void {
    this.Service.GetFileList().subscribe({
      next: (response: any) => {
      this.filelisttemp = response;      //this.FileList.push()
      console.log(this.filelisttemp);
    },
    
    error: (e)=>{console.log("error " + e);}, 
    
    complete: () => { 
    //   this.filelisttemp.forEach((element:any) => {
    //   console.log("first");
    //   if(this.FileList.length>0 ) return;
    //   var obj = { name:element.name, sizeinkb:element.size, uploadedby:"test"};
    //   this.FileList.push(obj);
    //   console.log(this.FileList);
    // } );
  }});


    //this.Service.GetFileList().pipe(map((response: Response) => response.json().map(res => new FileDataToDisplay{}))


  // this.FileList=[
  //     {
  //       name: "aadhaar.jpg",
  //       sizeinkb: 40,
  //       uploadedby:"Anand"       
  //     },
  //     {
  //       name: "pan.jpg",
  //       sizeinkb: 20,
  //       uploadedby:"Jeeni"  
  //     }
  //  ];

  //  console.log(this.FileList);
         
  }

}

