import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import {
  MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration,
  MsalService
} from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { Subject, Subscription, delay, filter, takeUntil } from 'rxjs';
import { SpinnerserviceService } from './spinnerservice.service';
import { ProgressSpinnerMode, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FilemanagerserviceService } from './filemanagerservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FileManageApp';
  isIframe = false;
  loginDisplay = false;
  // private readonly _destroying$ = new Subject<void>();
  isApplicationLoggedIn = false;
  isApplicationLoggedInSuccess = false;
  loading: boolean = false;
  employeeProfile: any;
  employeeName: string = "";
  constructor(
    private router: Router,
    private msalService: MsalService,
    private spinnerService: SpinnerserviceService,
    private Service: FilemanagerserviceService


  ) {

    console.log("inside constructor App component");
  }


  ngOnInit(): void {
    console.log("inside app comp init");

    //this.listenToLoading();
    this.isApplicationLoggedIn = this.isMsalAccountExists();
    //this.appInitService.isMsalTriggeredFromBrowser = false;
    if (!this.isApplicationLoggedIn) {
      this.updateLoggedURLViaBrowser();
    }
    else {
      console.log("inside app comp after confirming login done");
      this.router.navigate(['/FileManagerRoot']);
      //   this.Service.GetEmployeeProfile().subscribe((profile:any)=>
      //   {
      //     this.employeeName = profile.displayName;
      //   console.log(profile);

      // });
    }
  }


  // private listenToLoading(): void {

  //   console.log("inside listen To loading");
  //   this.spinnerService.loadingSub
  //     .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
  //     .subscribe((loading) => {
  //       this.loading = loading;
  //     });
  // }

  private updateLoggedURLViaBrowser(): void {

    console.log("inside LoggedURLViaBrowser");

    const inAppSubscription = new Subscription();
    //console.lo
    inAppSubscription.add(this.router.events.subscribe((evt: any) => {
      console.log(evt);
      if (evt instanceof NavigationStart) {
        if (evt && evt.url) {
          if (evt.url !== '/' && evt.url !== '/msal-authentication') {
            //this.appInitService.loggedURLViaBrowser = evt.url;
            // this.router.navigate(['/FileManagerRoot']);
            console.log("inside updateLoggedURLViaBrowser ");
            console.log(evt.url);
          }
          if (evt.url !== '/msal-authentication') {
            this.router.navigate(['/msal-authentication']);
          }
        }
      }
      inAppSubscription.unsubscribe();
    }));
  }

  private isMsalAccountExists(): boolean {
    return this.msalService?.instance?.getAllAccounts()?.length > 0;
  }

  // ngOnDestroy(): void {
  //   this._destroying$.next(undefined);
  //   this._destroying$.complete();
  // }

  setLoginDisplay() {
    this.loginDisplay = this.msalService.instance.getAllAccounts().length > 0;
  }

}
