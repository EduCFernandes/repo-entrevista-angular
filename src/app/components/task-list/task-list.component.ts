import { Component, OnInit } from '@angular/core';
import {  TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  titulo: string = '';

  constructor(public taskService: TaskService) {}

  ngOnInit() {
    this.titulo = 'Título lista';
  }
}
