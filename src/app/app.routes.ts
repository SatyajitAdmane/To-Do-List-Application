import { Routes } from '@angular/router';
import { TodolistComponent } from './todolist/todolist.component';
import { NewTaskComponent } from './newtask/newtask.component';
import { EdittaskComponent } from './edittask/edittask.component';

export const routes: Routes = [
    { path: '', component: TodolistComponent },
    { path: 'new', component: NewTaskComponent },
    { path: 'edit/:index', component: EdittaskComponent },
  ];