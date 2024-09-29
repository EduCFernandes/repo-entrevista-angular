import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponent } from './task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let service: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskFormComponent ],
      imports: [ReactiveFormsModule],
      providers: [TaskService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TaskService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid if title is less than 20 characters', () => {
    component.taskTitle.setValue('title');
    expect(component.taskTitle.invalid).toBeTrue();
    expect(component.taskTitle.errors?.['minlength']).toBeTruthy();
  });

  it('should be invalid if title is empty', () => {
    component.taskTitle.setValue('');
    expect(component.taskTitle.invalid).toBeTrue();
    expect(component.taskTitle.errors?.['required']).toBeTruthy();
  });

  it('should be invalid if title contains invalid characters', () => {
    component.taskTitle.setValue('task title 123 @@@');
    expect(component.taskTitle.invalid).toBeTrue();
    expect(component.taskTitle.errors?.['pattern']).toBeTruthy();
  });

  it('should mark the title as touched on submit when invalid', () => {
    component.taskTitle.setValue('');
    component.onSubmit();
    expect(component.taskTitle.touched).toBeTrue();
  });

  it('should submit the form and add a task', () => {
    component.taskTitle.setValue('Valid task title that is long enough');
    component.onSubmit();
    expect(component.taskTitle.errors).toEqual({ required: true });
    expect(component.taskTitle.value).toBeNull();
  });

  it('should set an error when task already exists', () => {
    const taskTitle = 'Valid task title that is long enough'
    service.addTask(taskTitle)
    component.taskTitle.setValue(taskTitle);
    component.onSubmit();
    expect(component.taskTitle.errors?.['alreadyExists']).toBeTruthy();
  });
});
