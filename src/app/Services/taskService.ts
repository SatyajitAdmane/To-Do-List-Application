import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Define a Task interface for better type safety
// task.service.ts
export interface Task {
    assignedTo: string;
    status: string;
    dueDate: any;
    priority: string;
    comments: string;
    description: string; // Add this line
  }
  

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // Using BehaviorSubject to hold and emit the current tasks
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable(); // Expose the tasks as an observable
  

  constructor() {
    // Initialize with some sample tasks (optional)
    this.tasksSubject.next([
        {
          assignedTo: 'Alice',
          status: 'Pending',
          dueDate: new Date('2024-10-15'),
          priority: 'High',
          comments: 'First task',
          description: 'Description for Alice\'s task', // Add description here
        },
        {
          assignedTo: 'Bob',
          status: 'Completed',
          dueDate: new Date('2024-10-10'),
          priority: 'Medium',
          comments: 'Second task',
          description: 'Description for Bob\'s task', // Add description here
        },
      ]);
      
  }

  // Method to add a new task
  addTask(task: Task) {
    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next([...currentTasks, task]);
  }

  // Method to get the current tasks as an array
  getTasks() {
    return this.tasksSubject.value; // Return current tasks
  }

  // Method to delete a task
  deleteTask(task: Task) {
    const currentTasks = this.tasksSubject.value; // Get current tasks
    this.tasksSubject.next(currentTasks.filter(t => t !== task)); // Update tasks without the deleted one
  }
  getTaskByIndex(index: number): Task | undefined {
    return this.tasksSubject.value[index];
  }
  updateTask(index: number, updatedTask: Task): void {
    const tasks = this.tasksSubject.value;
    tasks[index] = updatedTask;
    this.tasksSubject.next(tasks);
}

}
