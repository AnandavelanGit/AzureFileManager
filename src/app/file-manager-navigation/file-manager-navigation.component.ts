import { Component } from '@angular/core';

@Component({
  selector: 'app-file-manager-navigation',
  templateUrl: './file-manager-navigation.component.html',
  styleUrls: ['./file-manager-navigation.component.css']
})
export class FileManagerNavigationComponent {

  showFileList: boolean = false;
  showFileUpload: boolean = true;

  showTab: string = "FileList";

  tabclick(event$: string): void {
    console.log("inside tabclick");
    console.log(event$);
    if (event$ == "FileList")
      this.showTab = "FileList";
    else if (event$ = "UploadFile")
      this.showTab = "UploadFile";

      console.log(this.showTab);
    // ;if(event$.id = )

  }



}
