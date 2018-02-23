import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevtimeComponent } from './devtime.component';

describe('DevtimeComponent', () => {
  let component: DevtimeComponent;
  let fixture: ComponentFixture<DevtimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevtimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
