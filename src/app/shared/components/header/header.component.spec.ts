import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Component } from '@angular/core';

@Component({
  template: `<app-header title="Test Title"><button>Button</button></app-header>`
})
class TestHostComponent {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, TestHostComponent]
    })
    .compileComponents();

  fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.debugElement.children[0].componentInstance; 
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should render the title', () => {
    const title = 'Title'
    component.title = title;

    fixture.detectChanges()

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain(title);
  });

   it('should project content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toContain('Button');
  });
});
