import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  router = inject(Router)


async takePicture(promptLabelHeader: string) {
  return await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt,
    promptLabelHeader,
    promptLabelPhoto: 'Selecciona una imagen',
    promptLabelPicture: 'Toma una foto'
  });
};

constructor(private loadingCtrl: LoadingController) { }

  async showLoading() {
  const loading = await this.loadingCtrl.create({
    spinner: 'crescent',
    duration: 5000
  });

  await loading.present();
  return loading;
}

toastCtrl = inject(ToastController)

  async presentToast(opts ?: ToastOptions) {
  const toast = await this.toastCtrl.create(opts);
  toast.present();
}


// enruta a pagina disponible
routerLink(url: string) {
  return this.router.navigateByUrl(url);
}


// guardar elemento en localstorage
saveInLocalStorage(key: string, value: any) {
  return localStorage.setItem(key, JSON.stringify(value));
}

// obtiene elemento del localstorage
getFromLocalStorage(key: string) {
  return JSON.parse(localStorage.getItem(key))
}


}
