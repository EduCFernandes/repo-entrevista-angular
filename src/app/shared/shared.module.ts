import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskListComponent } from './components/task-list/task-list.component';

@NgModule({
  declarations: [HeaderComponent, TaskItemComponent, TaskListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [HeaderComponent, TaskItemComponent, TaskListComponent, ReactiveFormsModule, FormsModule,]
})
export class SharedModule { }
