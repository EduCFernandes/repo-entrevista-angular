import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemComponent } from './task-item.component';
import { TaskService } from 'src/app/services/task.service';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  const mockTask = { id: 1, title: 'Task Title', completed: false };

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['toggleTaskCompletion', 'removeTask']);

    await TestBed.configureTestingModule({
      declarations: [ TaskItemComponent ],
      providers: [
        { provide: TaskService, useValue: mockTaskService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;

    component.task = mockTask;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the task title', () => {
    const taskTitle = fixture.nativeElement.querySelector('[data-testid="task-title"]');
    expect(taskTitle.textContent).toContain(mockTask.title);
  });

  it('should display remove button if editable is true', () => {
    fixture.detectChanges();

    const removeButton = fixture.nativeElement.querySelector('[data-testid="task-remove-button"]');
    expect(removeButton).toBeTruthy()
  });

  it('should not display remove button if editable is false', () => {
    component.editable = false;
    fixture.detectChanges();

    const removeButton = fixture.nativeElement.querySelector('[data-testid="task-remove-button"]');

    expect(removeButton).toBeNull();
  });

  it('should display checkbox if editable is true', () => {
    fixture.detectChanges();

    const checkbox = fixture.nativeElement.querySelector('[data-testid="task-checkbox"]');

    expect(checkbox).toBeTruthy();
  });

  it('should not display checkbox if editable is false', () => {
    component.editable = false;
    fixture.detectChanges();

    const checkbox = fixture.nativeElement.querySelector('[data-testid="task-checkbox"]');

    expect(checkbox).toBeNull();
  });

   it('should add the completed class if task is completed', () => {
    component.task.completed = true; 
    fixture.detectChanges();
    
    const li = fixture.nativeElement.querySelector('li');
    expect(li.classList).toContain('completed');
  });

  it('should call removeTask when remove button is clicked', () => {
    component.editable = true;
    fixture.detectChanges();
    
    const removeButton = fixture.nativeElement.querySelector('[data-testid="task-remove-button"]');
    removeButton.click();
    
    expect(mockTaskService.removeTask).toHaveBeenCalledWith(1);
  });

  it('should call toggleTaskCompletion when checkbox is clicked', () => {
    component.editable = true;
    fixture.detectChanges();
    
    const checkbox = fixture.nativeElement.querySelector('[data-testid="task-checkbox"]');
    checkbox.click();
    
    expect(mockTaskService.toggleTaskCompletion).toHaveBeenCalledWith(1);
  });
});
