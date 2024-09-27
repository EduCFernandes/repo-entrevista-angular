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
});
