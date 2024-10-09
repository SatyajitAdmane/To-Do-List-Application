import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { TodolistComponent } from './app/todolist/todolist.component';
import { NewTaskComponent } from './app/newtask/newtask.component';
import { EdittaskComponent } from './app/edittask/edittask.component';

// This is the way to define routes in Angular 18
// const appRoutes: Routes = [
//   { path: '', component: TodolistComponent },
//   { path: 'new', component: NewTaskComponent },
//   { path: 'edit/:index', component: EdittaskComponent },
// ];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes) // Use provideRouter instead
  ]
})
.catch((err) => console.error(err));
