import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task, TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  @Input() editable: boolean = true;
  @Input() sort: boolean = false;
  titulo: string = '';
  tasks: Task[] = [];
  sub: Subscription = new Subscription();

  constructor(public taskService: TaskService) {}

  ngOnInit() {
    this.titulo = 'Título lista';

    const tasksSubscription = this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = this.sort ? this.taskService.getSortedTasks() : tasks;
    });

    this.sub.add(tasksSubscription);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
