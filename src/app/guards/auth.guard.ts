import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { map, take, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const firebaseSvc = inject(FirebaseService);
  const utilsSvc = inject(UtilsService);

  return firebaseSvc.getAuthState().pipe(
    take(1), // Tomar solo el primer valor emitido (evitar streams infinitos)
    map(auth => {
      if (auth) {
        return true; // Usuario autenticado, permitir acceso
      } else {
        utilsSvc.routerLink('/auth'); // Redireccionar si no está autenticado
        return false;
      }
    }),
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        console.warn('Usuario no autenticado, redirigiendo a /auth');
      }
    })
  );
};
