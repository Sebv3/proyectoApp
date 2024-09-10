import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.models';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {

tasks: Task[] = [

]

  constructor() { }

  ngOnInit() {
  }

}
