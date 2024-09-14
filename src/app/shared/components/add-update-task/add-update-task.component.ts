import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Item, Task } from 'src/app/models/task.models';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-task',
  templateUrl: './add-update-task.component.html',
  styleUrls: ['./add-update-task.component.scss'],
})
export class AddUpdateTaskComponent implements OnInit {


  @Input() task: Task;
  user = {} as User

  form = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [Validators.required, Validators.minLength(4)]),
    items: new FormControl([], [Validators.required, Validators.minLength(1)]),
  })

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) { }

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user')

    if (this.task) {
      this.form.setValue(this.task);
      this.form.updateValueAndValidity()
    }
  }

  getPercentage(): number {
    const totalItems = this.form.value.items.length;
    const completedItems = this.form.value.items.filter(item => item.completed).length;

    if (totalItems === 0) {
        return 0;
    }

    // Calcula el porcentaje y redondea al entero más cercano
    const percentage = (completedItems / totalItems) * 100;
    return Math.floor(percentage);
}

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {

    this.form.value.items = ev.detail.complete(this.form.value.items); 
    this.form.updateValueAndValidity();
  }

  removeItem(index: number) {
    this.form.value.items.splice(index,1);
    this.form.updateValueAndValidity();
  }

  createItem() {
    this.utilsSvc.presentAlert({
      header: "Nueva Actividad",
      backdropDismiss: false,
      inputs: [
        {
        name: 'name',
        type: 'textarea',
        placeholder: 'Hacer algo...'
      }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'calcel',

        },{
          text: 'Agregar',
          handler: (res) => {
            res.name

            let item: Item = {name: res.name, completed: false};
            this.form.value.items.push(item);
            this.form.updateValueAndValidity();

          }
        }
      ]
    })
  }


}
