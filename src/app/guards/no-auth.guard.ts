import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const firebaseSvc = inject(FirebaseService);
  const utilsSvc = inject(UtilsService);

  return new Promise((resolve) => {
    
    firebaseSvc.getAuth().onAuthStateChanged((auth) => {

      if(!auth) resolve(true);     
      else{
        utilsSvc.routerLink('/main/home');
        resolve(false);
      }
    })

  })
};
