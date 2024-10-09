import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaskService, Task } from '../Services/taskService'; // Import TaskService

@Component({
  selector: 'app-todolist',
  standalone: true,
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
  imports: [FormsModule, CommonModule] // Import FormsModule and CommonModule
})
export class TodolistComponent {
  tasks: Task[] = []; // Array to store tasks
  searchTerm: string = ''; // Search term for filtering tasks
  page: number = 1; // Current page for pagination
  itemsPerPage: number = 5; // Number of items per page

  constructor(private router: Router, private taskService: TaskService) {
    // Initialize tasks from TaskService
    this.tasks = this.taskService.getTasks();
  }

  // Filter tasks based on search term
  filteredTasks() {
    return this.tasks.filter(task =>
      task.assignedTo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Calculate total number of pages
  totalPages() {
    return Math.ceil(this.filteredTasks().length / this.itemsPerPage);
  }

  // Get the tasks to be displayed on the current page
  tasksToShow() {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    return this.filteredTasks().slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Navigate to the previous page
  prevPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  // Navigate to the next page
  nextPage() {
    if (this.page < this.totalPages()) {
      this.page++;
    }
  }

  // Navigate to add new task page
  addNewTask() {
    this.router.navigate(['/new']); // Navigate to the NewTaskComponent
  }

  editTask(task: Task) {
    const index = this.tasks.indexOf(task);
    console.log('Navigating to edit index:', index);
    this.router.navigate([`/edit/${index}`]);
  }
  
  

  // Refresh tasks from the TaskService
  refreshTasks() {
    this.tasks = this.taskService.getTasks(); // Refresh tasks list
    console.log('Tasks refreshed!');
  }

  // Delete a task
  deleteTask(task: Task) {
    this.taskService.deleteTask(task); // Delete task using TaskService
    this.tasks = this.taskService.getTasks(); // Refresh the task list after deletion
  }
}
