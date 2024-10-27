import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AddUpdateTaskComponent } from './components/add-update-task/add-update-task.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    AddUpdateTaskComponent

  ],
  exports: [
    HeaderComponent,
    CustomInputComponent,
    ReactiveFormsModule,
    LogoComponent,
    NgCircleProgressModule,
    AddUpdateTaskComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
  ]
})
export class SharedModule { }
