import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Task } from '../models/task.models';
import { collection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';


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

constructor(
  private loadingCtrl: LoadingController,
  private alertController: AlertController,
  private modalController: ModalController,
) { }

  async showLoading() {
  const loading = await this.loadingCtrl.create({
    spinner: 'crescent',
    duration: 5000
  });

  await loading.present();
  return loading;
}

async dismissLoading() {
  const isLoading = await this.loadingCtrl.getTop(); // Verificar si hay un loading activo
  if (isLoading) {
    await this.loadingCtrl.dismiss(); // Cerrar el loading activo
  }
}

toastCtrl = inject(ToastController)

  async presentToast(opts ?: ToastOptions) {
  const toast = await this.toastCtrl.create(opts);
  toast.present();
}


routerLink(url: string) {
  return this.router.navigateByUrl(url);
}

saveElementInLocalStorage(key: string, value: any) {
  return localStorage.setItem(key, JSON.stringify(value));
}

getElementFromLocalStorage(key: string) {
  return JSON.parse(localStorage.getItem(key))
}


saveInLocalStorage(key: string, value: any) {
  return localStorage.setItem(key, JSON.stringify(value));
}

getFromLocalStorage(key: string) {
  return JSON.parse(localStorage.getItem(key))
}

async presentAlert(opts: AlertOptions) {
  const alert = await this.alertController.create(opts);

  await alert.present();
}

async presentModal(opts: ModalOptions) {
  const modal = await this.modalController.create(opts);
  await modal.present();

  const {data} = await modal.onWillDismiss();

  if(data){
    return data;
  }

}

dismissModal(data?: any) {
  this.modalController.dismiss(data)
}

getPercentage(task: Task): number {
  const completedItems = task.items.filter(item => item.completed).length;
  const totalItems = task.items.length;
  return totalItems === 0 ? 0 : (completedItems / totalItems) * 100; 
}

isTaskCompleted(task: Task): boolean {
  return this.getPercentage(task) === 100;
}

countPendingTasks(tasks: Task[]): number {
  return tasks.filter(task => !this.isTaskCompleted(task)).length;
}



}
