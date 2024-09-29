import { TestBed } from '@angular/core/testing';

import { Task, TaskService } from './task.service';
import { MockTaskService } from './mock-task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService, { provide: MockTaskService, useValue: new MockTaskService() }]
    });
    
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load tasks', (done) => {
    service.tasks$.subscribe((tasks: Task[]) => {
      expect(tasks.length).toBe(3);
      done();
    })
  });

  it('should add a task successfully', (done) => {
    const taskTitle = 'new task test'
    const created = service.addTask(taskTitle);
    expect(created).toBeTrue();

    service.tasks$.subscribe((tasks: Task[]) => {
      expect(tasks.length).toBe(4);
      expect(tasks[tasks.length - 1].title).toBe(taskTitle)
      done()
    })
  });

  it('should not add a duplicate task', (done) => {
    const taskTitle = 'Estudar Angular'
    const created = service.addTask(taskTitle);
    expect(created).toBeFalse();

    service.tasks$.subscribe((tasks: Task[]) => {
      expect(tasks.length).toBe(3);
      done()
    })
  });

  it('should not add a task with empty title', (done) => {
    const taskTitle = ''
    const created = service.addTask(taskTitle);
    expect(created).toBeFalse();

    service.tasks$.subscribe((tasks: Task[]) => {
      expect(tasks.length).toBe(3);
      done()
    })
  });

  it('should remove a task by id', (done) => {
    const taskId = 1;
    service.removeTask(taskId);

    service.tasks$.subscribe((tasks: Task[]) => {
      expect(tasks.length).toBe(2)
      expect(tasks[0].id).not.toBe(taskId)
      done()
    })
  });

  it('should remove all completed tasks', (done) => {
    service.toggleTaskCompletion(1);
    service.toggleTaskCompletion(3);
    service.removeCompletedTasks();

    service.tasks$.subscribe((tasks: Task[]) => {
      expect(tasks.length).toBe(1);
      expect(tasks.find(task => task.id === 1)).toBeUndefined();
      expect(tasks.find(task => task.id === 3)).toBeUndefined();
      done()
    })
  });

  it('should toggle task completed property', (done) => {
    const taskId = 1;
    service.toggleTaskCompletion(taskId);

    service.tasks$.subscribe((tasks: Task[]) => {
      const changedTask = tasks.find((task: Task) => task.id === taskId);
      expect(changedTask?.completed).toBeTrue()
      done()
    })
  });

  it('should return the tasks sorted alphabetically', () => {
    const sortedTasks = service.getSortedTasks();

    expect(sortedTasks).toEqual([
      { id: 2, title: 'Comprar mantimentos', completed: false },
      { id: 1, title: 'Estudar Angular', completed: false },
      { id: 3, title: 'Praticar exercícios', completed: false },
    ]);
  });
});
