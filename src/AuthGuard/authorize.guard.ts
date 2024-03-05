import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const AuthorizeGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  const moduleUrl = route.url;
  console.log("inside guard");
  console.log(sessionStorage.getItem('secretAnswers'));

  if (sessionStorage.getItem('secretAnswers') == 'done') {    
    
    return true;
  }
  else {
    inject(Router).navigate(['SecretQuestion2']);
    //return false;
  }
  return false;
};
