import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { TodolistComponent } from './todolist/todolist.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewTaskComponent } from './newtask/newtask.component';
import { EdittaskComponent } from './edittask/edittask.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            TodolistComponent,
            NewTaskComponent,
            EdittaskComponent,
          CommonModule,
          FormsModule,
          RouterOutlet],
         
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-task-app';
}
