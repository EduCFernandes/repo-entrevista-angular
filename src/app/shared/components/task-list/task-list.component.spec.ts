import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { SharedModule } from '../../shared.module';
import { of } from 'rxjs';
import { Task, TaskService } from 'src/app/services/task.service';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskServiceMock: any;
  const taskMock: Task = { id: 1, title: 'Task Title', completed: false };

  beforeEach(async () => {
    taskServiceMock = {
      tasks$: of([]),
      getSortedTasks: jasmine.createSpy('getSortedTasks').and.returnValue([]), 
      removeCompletedTasks: jasmine.createSpy('removeCompletedTasks')
    };

    await TestBed.configureTestingModule({
      declarations: [ TaskListComponent ],
      providers: [
        { provide: TaskService, useValue: taskServiceMock }
      ],
      imports: [SharedModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;

    component.tasks = [];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the task list title', () => {
    component.titulo = 'Title';
    fixture.detectChanges();

    const listTitle = fixture.nativeElement.querySelector('[data-testid="list-title"]');
    expect(listTitle.textContent).toContain('Title');
  });

  it('should display Delete Completed Tasks button if editable is true and there are tasks registered', () => {
    component.editable = true;
    component.tasks = [{ id: 1, title: 'title', completed: false }]
    fixture.detectChanges();

    const deleteButton = fixture.nativeElement.querySelector('[data-testid="delete-completed-button"]');
    expect(deleteButton).toBeTruthy()
  });

  it('should not display Delete Completed Tasks button if editable is false', () => {
    component.editable = false;
    fixture.detectChanges();

    const deleteButton = fixture.nativeElement.querySelector('[data-testid="delete-completed-button"]');

    expect(deleteButton).toBeNull();
  });

  it('should show empty message when no there are no tasks to show', () => {
    component.tasks = [];
    fixture.detectChanges();

    const emptyMessage = fixture.nativeElement.querySelector('[data-testid="empty-list-message"]');
    expect(emptyMessage).toBeTruthy();
    expect(emptyMessage.textContent).toContain('No tasks registered!');
  });

  it('should subscribe to tasks and set tasks on init', () => {
    const mockTasks: Task[] = [taskMock];
    taskServiceMock.tasks$ = of(mockTasks);
    component.ngOnInit();
    expect(component.tasks).toEqual(mockTasks)
  });

  it('should call removeCompletedTasks on Delete Completed Tasks button click', () => {
    component.editable = true; 
    component.tasks = [taskMock];
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('[data-testid="delete-completed-button"]');
    button.click();

    expect(taskServiceMock.removeCompletedTasks).toHaveBeenCalled();
  });

  afterEach(() => {
    component.ngOnDestroy(); 
  });
});
