import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';
import {
  InteractionType, IPublicClientApplication,
  PublicClientApplication, PopupRequest, AuthenticationResult
} from '@azure/msal-browser';
import { MsalInterceptorConfiguration, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } 
from '@azure/msal-angular';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-msal-authentication',
  templateUrl: './msal-authentication.component.html',
  styleUrls: ['./msal-authentication.component.css']
})
export class MsalAuthenticationComponent implements OnInit, OnDestroy {

  private msalSubscriptions: Subscription = new Subscription();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private router: Router,
    private msalService: MsalService,
   // private appInitService: AppInitService
  ) { }

  ngOnInit(): void {
    console.log("inside init of msal component");
    
    if (!this.isMsalAccountExists()) {
      this.openLoginPopup();
    } else {
     // this.appInitService.routeToLoggedUrl();
    }
  }

  private isMsalAccountExists(): boolean {
    return this.msalService?.instance?.getAllAccounts()?.length > 0;
  }

  private openLoginPopup(): void {
    console.log("inside openLoginPopup");
    if (this.msalGuardConfig.authRequest) {
      console.log("just befor popup" + this.msalGuardConfig.authRequest );

      this.msalSubscriptions.add(
        this.msalService.loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.navigateToHome(response);
          })
      );
    } else {
      this.msalSubscriptions.add(
        this.msalService.loginPopup()
          .subscribe((response: AuthenticationResult) => {
            this.navigateToHome(response);
          })
      );
    }
  }

  private navigateToHome(response: AuthenticationResult): void {
    // this.appInitService.isSuccessfulLoginTriggered.emit();
    // this.msalService.instance.setActiveAccount(response.account);
    // this.appInitService.callLoginLevelOperations(() => {
    //   this.appInitService.routeToLoggedUrl();
    // });
  }

  ngOnDestroy(): void {
    this.msalSubscriptions.unsubscribe();
  }

}
const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(environment.graphApi, ['user.read']);
  protectedResourceMap.set(environment.apiUrl, [environment.expose]);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read']
    }
  };
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.clientId,
      authority: environment.authority,
      redirectUri: environment.redirectUri,
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: isIE,
    }
  }
  );
}
