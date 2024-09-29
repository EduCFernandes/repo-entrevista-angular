import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksOrderedListComponent } from './tasks-ordered-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('TasksOrderedListComponent', () => {
  let component: TasksOrderedListComponent;
  let fixture: ComponentFixture<TasksOrderedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksOrderedListComponent ], 
      imports: [SharedModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksOrderedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header component', () => {
    const headerElement: HTMLElement = fixture.nativeElement.querySelector('app-header');
    expect(headerElement).toBeTruthy();
    expect(headerElement.getAttribute('title')).toBe('Tasks (Sorted Alphabetically)');
  });

  it('should render the task list component', () => {
    const taskListElement: HTMLElement = fixture.nativeElement.querySelector('app-task-list');
    expect(taskListElement).toBeTruthy();
  });

  it('should render redirect button', () => {
    const button = fixture.nativeElement.querySelector('[data-testid="redirect-button"]');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Task Manager');
    expect(button.getAttribute('routerLink')).toBe('/');
  });
});
