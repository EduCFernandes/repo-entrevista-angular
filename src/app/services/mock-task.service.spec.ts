import { TestBed } from '@angular/core/testing';

import { MockTaskService } from './mock-task.service';
import { Task } from './task.service';

describe('MockTaskService', () => {
  let service: MockTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of tasks', (done) => {
    service.getTasks().subscribe((tasks: Task[]) => {
      expect(tasks.length).toBe(3);
      expect(tasks).toEqual([
        { id: 1, title: 'Estudar Angular', completed: false },
        { id: 2, title: 'Comprar mantimentos', completed: false },
        { id: 3, title: 'Praticar exercícios', completed: false },
      ]);
      done();
    });
  });
});
