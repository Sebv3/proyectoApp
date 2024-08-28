import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

export const authGuard: CanActivateFn = (route, state) => {

  const firebaseSvc = inject(FirebaseService);
  const utilsSvc = inject(UtilsService);

  let user = localStorage.getItem('user');

  return new Promise((resolve) => {
    
    firebaseSvc.getAuth().onAuthStateChanged((auth) => {

      if(auth){
        if(user) resolve(true);
      }
      else{
        firebaseSvc.signOut();
        resolve(false);
      }
    })

  })
};
