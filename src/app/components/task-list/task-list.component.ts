import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  titulo: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.titulo = 'Título lista';
    this.taskService.tasks$.subscribe(tasks => this.tasks = tasks);
  }

}
