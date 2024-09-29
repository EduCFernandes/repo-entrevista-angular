import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagerComponent } from './task-manager.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskFormComponent } from './task-form/task-form.component';

describe('TaskManagerComponent', () => {
  let component: TaskManagerComponent;
  let fixture: ComponentFixture<TaskManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskManagerComponent, TaskFormComponent ],
      imports: [SharedModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header component', () => {
    const headerElement: HTMLElement = fixture.nativeElement.querySelector('app-header');
    expect(headerElement).toBeTruthy();
    expect(headerElement.getAttribute('title')).toBe('Task Manager');
  });

  it('should render the task form component', () => {
    const taskListElement: HTMLElement = fixture.nativeElement.querySelector('app-task-form');
    expect(taskListElement).toBeTruthy();
  });

  it('should render the task list component', () => {
    const taskListElement: HTMLElement = fixture.nativeElement.querySelector('app-task-list');
    expect(taskListElement).toBeTruthy();
  });

  it('should render redirect button', () => {
    const button = fixture.nativeElement.querySelector('[data-testid="redirect-button"]');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('List Sorted Tasks');
    expect(button.getAttribute('routerLink')).toBe('list');
  });
});
