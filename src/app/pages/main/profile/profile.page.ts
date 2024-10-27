import { Component, inject, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  userData: User; // Para almacenar los datos del usuario

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.userData = this.utilsSvc.getFromLocalStorage('user'); // Carga los datos del usuario desde localStorage
  }

  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture('Imagen del perfil')).dataUrl;

    const loading = await this.utilsSvc.showLoading();
    await loading.present();

    let imagePath = `${this.userData.uid}/profile`;
    this.userData.image = await this.firebaseSvc.uploadImage(imagePath, dataUrl);

    const path = `users/${this.userData.uid}`;
    this.firebaseSvc.updateDocument(path, { image: this.userData.image }).then(async () => {
      this.utilsSvc.saveInLocalStorage('user', this.userData);
      this.utilsSvc.presentToast({
        message: 'Imagen actualizada exitosamente',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline',
      });
    }).catch(error => {
      console.log(error);
      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        position: 'middle',
        icon: 'alert-circle-outline',
      });
    }).finally(() => {
      loading.dismiss();
    });
  }

  async updateProfile() {
    const path = `users/${this.userData.uid}`;
    try {
      // Verificar si el nuevo email ya existe en la base de datos
      const emailExists = await this.firebaseSvc.checkEmailExists(this.userData.email);
      if (emailExists) {
        this.utilsSvc.presentToast({
          message: 'Este correo ya está en uso por otra cuenta.',
          duration: 2500,
          color: 'warning',
          position: 'middle',
          icon: 'alert-circle-outline',
        });
        return; // Salir de la función si el correo ya está en uso
      }
  
      // Proceder con la actualización si el correo no existe
      await this.firebaseSvc.updateDocument(path, {
        name: this.userData.name,
        email: this.userData.email,
        image: this.userData.image
      });
  
      this.utilsSvc.saveInLocalStorage('user', this.userData); // Guarda los cambios en localStorage
      this.utilsSvc.presentToast({
        message: 'Perfil actualizado exitosamente',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline',
      });
    } catch (error) {
      console.error(error);
      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        position: 'middle',
        icon: 'alert-circle-outline',
      });
    }
  }
  
}
