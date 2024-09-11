import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateTaskComponent } from '../../../shared/components/add-update-task/add-update-task.component';



@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {

tasks: Task[] = [
  {
    id: '1',
    title: 'Autenticacion de Google',
    description: 'Crear una funcion que permita autenticar al usuario en Google',
    items: [
      { name:'Actividad 1', completed: true },
      { name:'Actividad 2', completed: false },
      { name:'Actividad 3', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Autenticacion de Google',
    description: 'Crear una funcion que permita autenticar al usuario en Google',
    items: [
      { name:'Actividad 1', completed: true },
      { name:'Actividad 2', completed: false },
      { name:'Actividad 3', completed: false },
    ],
  },
  {
    id: '3',
    title: 'Autenticacion de Google',
    description: 'Crear una funcion que permita autenticar al usuario en Google',
    items: [
      { name:'Actividad 1', completed: true },
      { name:'Actividad 2', completed: false },
      { name:'Actividad 3', completed: false },
    ],
  },
  

]

constructor(
  private firebaseSvc: FirebaseService,
  private utilsSvc: UtilsService
) { }

  ngOnInit() {
  }

  getPercentage(task: Task) {
    return this.utilsSvc.getPercentage(task)
  }

  addUpdateTask(task?: Task) {
    this.utilsSvc.presentModal({
      component: AddUpdateTaskComponent,
      componentProps: { task },
      cssClass: 'add-update-modal'
    })
  }



}
