import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Timestamp } from 'rxjs';
import { FileDataToDisplay, IFileData } from '../ifile-data.model';
import { FilemanagerserviceService } from '../filemanagerservice.service';
import { Observable, of, pipe} from 'rxjs';
import { map, filter, tap } from 'rxjs/operators'
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

// const   dataList : IFileData[] =  [
//   {name: 'test', size: 30,  uploadedDate: new Date('2024/01/04')},
//   {name: 'abc', size: 10,  uploadedDate: new Date('2024/03/04')},
//   {name: 'game', size: 45,  uploadedDate: new Date('2024/02/04')},
// ];


@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css'],
  // standalone: true,
  // imports: [MatTableModule, MatSortModule,MatPaginatorModule],
})

export class FileManagerComponent implements AfterViewInit {
 // filelisttemp:any []= [];
 containerList:any [] =[];
 
 selectedContainer:string="";
  displayedColumns: string[] = ['name', 'size', 'uploadedDate'];
  @ViewChild(MatPaginator)  paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<IFileData>();
  // dataSource = new MatTableDataSource<IFileData>(dataList);

  constructor(private Service: FilemanagerserviceService)
   {
    console.log("inside constructor");
   }

   ngOnInit(): void {
    console.log("inside init");
    this.GetFileList();
    this.GetContainerList();
  }

  //console.log(this.filelisttemp);

  ngAfterViewInit() {
    console.log("inside after view init");
    //console.log(this.filelisttemp);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
     
      return isdownloadsuccess;
   }

    GetFileList(): void {
     this.Service.GetFileList().subscribe({
      next: (response: any) => {        
      this.dataSource.data = response;    //this.FileList.push()       
    },    
    error: (e)=>{console.log("error " + e);},     
    complete: () => {
      console.log("inside complete");      
      //console.log(this.filelisttemp);
      //this.dataSource.data = this.filelisttemp;
    //   this.filelisttemp.forEach((element:any) => {
    //   if(this.FileList.length>0 ) return;
    //   var obj = { name:element.name, sizeinkb:element.size, uploadedby:"test"};
    //   this.FileList.push(obj);
    //   console.log(this.FileList);
    // } );
  }});
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

  containerChange() :void
  {
    console.log("inside container change");
    this.Service.GetFileListForContainer(this.selectedContainer).subscribe({
      next: (response: any) => {        
      this.dataSource.data = response;    //this.FileList.push()       
    },    
    error: (e)=>{console.log("error " + e);},     
    complete: () => {
      console.log("inside complete");      
      
  }});
   
  }

  SortChange(e:any) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (e.direction) {
      
    } else {
     
    }
  }

}

