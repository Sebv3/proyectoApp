import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() { }

  async submit() {
    if (this.form.valid) {
      const email = this.form.value.email;
  
      // Verificar si el correo existe
      const emailExists = await this.firebaseSvc.checkEmailExists(email);
  
      if (!emailExists) {
        this.utilsSvc.presentToast({
          message: 'El correo no está registrado',
          duration: 2500,
          position: 'middle',
          icon: 'alert-circle-outline'
        });
        return;
      }
  
      const loading = await this.utilsSvc.showLoading();
      await loading.present();
  
      this.firebaseSvc.sendRecoveryEmail(email).then(() => {
        this.utilsSvc.presentToast({
          message: 'Correo enviado con éxito',
          duration: 1500,
          position: 'middle',
          icon: 'mail-outline'
        });
  
        this.utilsSvc.routerLink('/auth');
        this.form.reset();
      }).catch(error => {
        console.log(error);
        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          position: 'middle',
          icon: 'alert-circle-outline'
        });
      }).finally(() => {
        loading.dismiss();
      });
    }
  }
  
  

  
}
