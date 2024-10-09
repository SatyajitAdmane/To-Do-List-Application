// newtask.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, Task } from '../Services/taskService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  standalone: true,
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css'],
  imports: [FormsModule]
})
export class NewTaskComponent implements OnInit {
  task: Task = {
    assignedTo: '',
    dueDate: new Date(),
    description: '',
    priority: 'Normal',
    status: 'Not Started',
    comments: '',
  };

  taskIndex: number | null = null;  // Track if we are editing a task

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Check if editing by retrieving the index from the route
    this.route.params.subscribe((params: { [x: string]: any; }) => {
      const index = params['index'];
      if (index !== undefined) {
        this.taskIndex = +index; // Convert index to number
        const taskToEdit = this.taskService.getTaskByIndex(this.taskIndex);
        if (taskToEdit) {
          this.task = { ...taskToEdit };  // Populate form with existing task data
        }
      }
    });
  }

  createTask(): void {
    if (this.taskIndex !== null) {
      // If editing, update the existing task
      this.taskService.updateTask(this.taskIndex, this.task);
    } else {
      // If creating a new task, add it
      this.taskService.addTask(this.task);
    }
    this.router.navigate(['']); // Navigate back to the task list
  }

  cancel() {
    // Navigate back or reset the form or perform another action
    console.log('Canceling task creation');
    this.router.navigate(['/']); // Example: navigate to home or task list
  }
}
