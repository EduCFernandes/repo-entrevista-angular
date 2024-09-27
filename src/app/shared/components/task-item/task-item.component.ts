import { Component, Input } from '@angular/core';
import { Task, TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Input() editable: boolean = true;

  constructor(private taskService: TaskService) {}

  onToggle() {
    this.taskService.toggleTaskCompletion(this.task.id);
  }

  onRemove() {
    this.taskService.removeTask(this.task.id);
  }
}
