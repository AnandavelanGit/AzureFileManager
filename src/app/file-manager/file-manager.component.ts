import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Subject, Timestamp } from 'rxjs';
import { FilemanagerserviceService } from '../Services/filemanagerservice.service';
import { Observable, of, pipe } from 'rxjs';
import { map, filter, tap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { IFileData } from '../Models/ifile-data.model';

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

export class FileManagerComponent implements OnInit, AfterViewInit {
  // filelisttemp:any []= [];
  containerList: any[] = [];
  public searchTerms = new Subject<string>();
  searchTerm: string = '';

  public selectedContainer: string = "";
  private fileListFiltered: IFileData[] = [];
  private fileListUnFiltered: IFileData[] = [];

  displayedColumns: string[] = ['name', 'size', 'uploadedDate'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<IFileData>();
  // dataSource = new MatTableDataSource<IFileData>(dataList);

  constructor(private Service: FilemanagerserviceService) {
    console.log("inside constructor file-manager");
  }

  onKeyUp(event: KeyboardEvent) {
    console.log("inside keyboard event");
    const value = (event.target as HTMLInputElement).value;
    if (value.length >= 3) {
      this.FilterChange(value); // Replace with your actual method name
    }
    if (value.length == 0) {
      this.dataSource.data = this.fileListUnFiltered;

    }
  }


  ngOnInit(): void {
    console.log("inside init");

    this.GetContainerList();
    //this.selectedContainer = 
  }

  //console.log(this.filelisttemp);

  ngAfterViewInit() {
    console.log("inside after view init");

    //this.GetFileList();
    //console.log(this.filelisttemp);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  onCellClick(filename: string) {
    console.log(filename);
    this.DownloadFile(filename);

  }

  private DownloadFile(filename: string): boolean {
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
      error: (e) => { console.log("error " + e); },
      complete: () => {
        console.log("inside complete GetFilelist");

      }
    });
  }

  GetContainerList(): void {
    console.log("inside GetContainerList");
    this.Service.GetContainers().subscribe({
      next: (response: any) => {
        this.containerList = response;    //this.FileList.push()       
      },
      error: (e) => { console.log("error " + e); },
      complete: () => {
        console.log("inside complete GetContainerList");
        console.log(this.containerList);
        this.selectedContainer = this.containerList[0];
        this.containerChange();
      }
    });
  }

  containerChange(): void {
    console.log("inside container change");
    this.Service.GetFileListForContainer(this.selectedContainer).subscribe({
      next: (response: any) => {
        this.fileListUnFiltered = response;
        this.dataSource.data = response;    //this.FileList.push()       
      },
      error: (e) => { console.log("error " + e); },
      complete: () => {
        console.log("inside complete containerchange");

      }
    });

  }

  public FilterChange(term: string): void {
    console.log("inside filter change");

    console.log(this.fileListUnFiltered);

    this.dataSource.data = this.fileListUnFiltered.filter(item => item.name.toLowerCase().includes(term.toLowerCase()));


  }

  SortChange(e: any) {

    if (e.direction) {

    } else {

    }
  }

}

