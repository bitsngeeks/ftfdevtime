import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsviewComponent } from './projectsview.component';

describe('ProjectsviewComponent', () => {
  let component: ProjectsviewComponent;
  let fixture: ComponentFixture<ProjectsviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
