import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Task } from 'src/app/models/task.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  
  tasks: Task[] = [];
  pendingTasksCount: number = 0;
  pendingTasks: Task[] = []; // Nueva propiedad para tareas pendientes

  ngOnInit() { 
    this.getTasks();
  }

  ionViewWillEnter() {
    this.getTasks(); // Obtener tareas cuando la vista está activa
  }

  getTasks() {
    const user = this.utilsSvc.getElementFromLocalStorage('user');
    const path = `users/${user.uid}`;
    
    // Mantener la suscripción activa
    const sub = this.firebaseSvc.getSubcollection(path, 'tasks').subscribe({
      next: (res: Task[]) => {
        this.tasks = res;
        this.updatePendingTasks(); // Actualiza las tareas pendientes y el contador
      }
    });
    
    // Limpiar la suscripción cuando el componente se destruye
    // Esto se puede hacer en ngOnDestroy si es necesario
    // this.sub = sub;
  }

  updatePendingTasks() {
    this.pendingTasks = this.tasks.filter(task => !this.utilsSvc.isTaskCompleted(task));
    this.pendingTasksCount = this.pendingTasks.length; // Actualiza el contador
  }
}
