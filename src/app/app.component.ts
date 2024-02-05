import {  Component, OnInit, Inject, OnDestroy  } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, 
  MsalService } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { Subject, Subscription, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FileManageApp';
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();
  isApplicationLoggedIn = false;
  isApplicationLoggedInSuccess = false;
  constructor(
   //@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
   private router: Router,
    private msalService: MsalService,
    //private authService: MsalService,
  // private msalBroadcastService: MsalBroadcastService
  ) { }

  // ngOnInit(): void {    
  //   //this.isIframe = window !== window.parent && !window.opener;

  //   // this.msalBroadcastService.inProgress$
  //   //   .pipe(
  //   //     filter((status: InteractionStatus) => status === InteractionStatus.None),
  //   //     takeUntil(this._destroying$)
  //   //   )
  //   //   .subscribe(() => {
  //   //     this.setLoginDisplay();
  //   //   });
  // }
  ngOnInit(): void {
    console.log("inside app comp init");
    this.isApplicationLoggedIn = this.isMsalAccountExists();
    //this.appInitService.isMsalTriggeredFromBrowser = false;
    this.updateLoggedURLViaBrowser();
  }

  private updateLoggedURLViaBrowser(): void {

    console.log("inside LoggedURLViaBrowser");

    const inAppSubscription = new Subscription();
    //console.lo
    inAppSubscription.add(this.router.events.subscribe((evt: any) => {
      console.log(evt);
      if (evt instanceof NavigationStart) {
        if (evt && evt.url) {
          if (evt.url !== '/' && evt.url !== '/msal-authentication') {
          //  this.appInitService.loggedURLViaBrowser = evt.url;
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

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  setLoginDisplay() {
    this.loginDisplay = this.msalService.instance.getAllAccounts().length > 0;
  }


  // login() {
  //   if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
  //     if (this.msalGuardConfig.authRequest) {
  //       this.authService.loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
  //         .subscribe((response: AuthenticationResult) => {
  //           this.authService.instance.setActiveAccount(response.account);
  //         });
  //     } else {
  //       this.authService.loginPopup()
  //         .subscribe((response: AuthenticationResult) => {
  //           this.authService.instance.setActiveAccount(response.account);
  //         });
  //     }
  //   } else {
  //     if (this.msalGuardConfig.authRequest) {
  //       this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
  //     } else {
  //       this.authService.loginRedirect();
  //     }
  //   }
  // }

  // logout() {
  //   if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
  //     this.authService.logoutPopup({
  //       postLogoutRedirectUri: "/",
  //       mainWindowRedirectUri: "/"
  //     });
  //   } else {
  //     this.authService.logoutRedirect({
  //       postLogoutRedirectUri: "/",
  //     });
  //   }
  // }

}
