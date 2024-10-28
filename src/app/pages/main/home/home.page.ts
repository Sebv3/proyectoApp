import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Task } from 'src/app/models/task.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  router = inject(Router);
  
  tasks: Task[] = [];
  pendingTasksCount: number = 0;
  pendingTasks: Task[] = [];

  ngOnInit() { 
    this.getTasks();
  }

  ionViewWillEnter() {
    this.getTasks();
  }

  getTasks() {
    const user = this.utilsSvc.getElementFromLocalStorage('user');
    const path = `users/${user.uid}`;
    
    const sub = this.firebaseSvc.getSubcollection(path, 'tasks').subscribe({
      next: (res: Task[]) => {
        this.tasks = res;
        this.updatePendingTasks();
      }
    });
  }

  updatePendingTasks() {
    this.pendingTasks = this.tasks.filter(task => !this.utilsSvc.isTaskCompleted(task));
    this.pendingTasksCount = this.pendingTasks.length;
  }

  navigateToProgress() {
    this.router.navigate(['/progress']); // Ruta de la página de progreso
  }

  navigateToWeeklyTasks() {
    this.router.navigate(['/weekly-tasks']); // Ruta de la página de tareas de la semana
  }
}