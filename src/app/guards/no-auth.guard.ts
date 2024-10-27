import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { map, take, tap } from 'rxjs';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const firebaseSvc = inject(FirebaseService);
  const utilsSvc = inject(UtilsService);

  return firebaseSvc.getAuthState().pipe(
    take(1), // Solo toma el primer valor emitido
    map(auth => {
      if (!auth) {
        return true; // Usuario no autenticado, permitir acceso
      } else {
        utilsSvc.routerLink('/main/home'); // Redirigir si está autenticado
        return false;
      }
    }),
    tap(isNotAuthenticated => {
      if (!isNotAuthenticated) {
        console.warn('Usuario ya autenticado, redirigiendo a /main/home');
      }
    })
  );
};
