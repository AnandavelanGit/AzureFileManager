import { Component, OnInit } from '@angular/core';
import { FilemanagerserviceService } from '../filemanagerservice.service';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  employeeName: string = '';

  constructor(private Service: FilemanagerserviceService, private msalService: MsalService) {
    console.log('inside constructor Header component');
  }

  ngOnInit(): void {
    console.log('inside header comp init');
    this.Service.GetEmployeeProfile().subscribe((profile: any) => {
      this.employeeName = profile.displayName;
      console.log(profile);
    });
  }

  logout(): void {
    this.msalService.logout();
  }

}
