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

  constructor(private mockTaskService: MockTaskService) {
    this.loadTasks();  
  }

  private loadTasks() {
    this.mockTaskService.getTasks().subscribe((tasks) => {
      this.tasksSubject.next(tasks); 
    });
  }

  addTask(title: string): boolean {
    if(!title || title === '') return false;
    
    const taskExists = this.tasksSubject.value.some((task) => task.title === title)

    if(taskExists) return false;
    
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
  
    this.tasksSubject.next([...this.tasksSubject.value, newTask]);
    return true;
  }

  removeTask(id: number) {
    const updatedTasks = this.tasksSubject.value.filter(task => task.id !== id);
    this.tasksSubject.next(updatedTasks);
  }

  removeCompletedTasks() {
    const updatedTasks = this.tasksSubject.value.filter(task => !task.completed);
    this.tasksSubject.next(updatedTasks);
  }

  toggleTaskCompletion(id: number) {
    const updatedTasks = this.tasksSubject.value.map(task => {
      if(task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });

    this.tasksSubject.next(updatedTasks);
  }

  getSortedTasks() {
    return [...this.tasksSubject.value].sort((a, b) => a.title.localeCompare(b.title));
  }
}
