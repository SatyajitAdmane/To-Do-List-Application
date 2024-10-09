import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, Task } from '../Services/taskService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edittask',
  standalone: true,
  templateUrl: './edittask.component.html', // Ensure this file exists
  styleUrls: ['./edittask.component.css'],
  imports: [FormsModule]
})
export class EdittaskComponent implements OnInit {
  task!: Task; // The task to be edited
  index!: number; // The index of the task in the list

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

 ngOnInit(): void {
  this.index = Number(this.route.snapshot.paramMap.get('index'));
  const taskToEdit = this.taskService.getTaskByIndex(this.index);

  if (taskToEdit) {
    this.task = { ...taskToEdit };

    // Ensure dueDate is converted to 'YYYY-MM-DD' string
    if (this.task.dueDate instanceof Date) {
      this.task.dueDate = this.task.dueDate.toISOString().split('T')[0];
    }

    // Ensure task.status has a valid value matching one of the <option> values
    if (!['Not Started', 'In Progress', 'Completed'].includes(this.task.status)) {
      this.task.status = 'Not Started'; // Set a default value if the current status is invalid
    }
  } else {
    this.router.navigate(['/']);
  }
}

  
  

  // Update the task when the form is submitted
  updateTask() {
    if (this.task && this.index >= 0) {
      this.taskService.updateTask(this.index, this.task); // Pass both index and updated task
      this.router.navigate(['/']); // Navigate back to the task list after update
    }
  }
  cancel() {
    // Navigate back or reset the form or perform another action
    console.log('Canceling task creation');
    this.router.navigate(['/']); // Example: navigate to home or task list
  }
}
