import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  pages = [
    { title: 'Inicio', url: '/main/home', icon: 'home-outline' },
    { title: 'Perfil', url: '/main/profile', icon: 'person-outline' },
  ]

  router = inject(Router);
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  currentPath: string = '';

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event?.url) this.currentPath = event.url;
    });
  
    this.firebaseSvc.authStateChanged$.subscribe(() => {
      this.refreshUserData();  // Refresca los datos del usuario
    });
  }

  refreshUserData() {
    const user = this.utilsSvc.getFromLocalStorage('user');
    if (!user) {
      console.log('Usuario deslogueado');
      // Opcionalmente redirige o realiza otra acción aquí.
    }
  }

  user(): User {
    return this.utilsSvc.getFromLocalStorage('user');
  }


  signOut() {
    this.utilsSvc.presentAlert({
      header: 'Cerrar Sesión',
      message: '¿Quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          
        }, {
          text: 'Aceptar',
          handler: () => {
            this.firebaseSvc.signOut();
          }
        }
      ]
    })
  }

}
