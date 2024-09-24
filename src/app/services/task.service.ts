import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MockTaskService } from './mock-task.service';  // Importar o serviço mock

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  private tasks: Task[] = [];

  constructor(private mockTaskService: MockTaskService) {
    this.loadTasks();  
  }

  private loadTasks() {
    this.mockTaskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.tasksSubject.next(this.tasks); 
    });
  }

  addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks);
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next(this.tasks);
  }

  toggleTaskCompletion(id: number) {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.completed = !task.completed;
      this.tasksSubject.next(this.tasks);
    }
  }
}
