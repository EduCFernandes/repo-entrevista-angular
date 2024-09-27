import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { onlyLettersAndSpaces } from 'src/app/helpers/validators/regex-validations';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  taskTitle: FormControl = new FormControl('', [Validators.required, Validators.minLength(20), Validators.pattern(onlyLettersAndSpaces)])

  constructor(private taskService: TaskService) { }

  onSubmit() {
    if (this.taskTitle.invalid) {
      this.taskTitle.markAsTouched()
      return;
    }

    const successfullyAdded = this.taskService.addTask(this.taskTitle.value.trim());

    if (!successfullyAdded) {
      this.taskTitle.setErrors({ alreadyExists: true })
    } else {
      this.taskTitle.setErrors(null)
      this.taskTitle.markAsUntouched()
      this.taskTitle.reset()
      console.log('Task added');
    }
  }
}
