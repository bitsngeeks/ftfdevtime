import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsviewComponent } from './clientsview.component';

describe('ClientsviewComponent', () => {
  let component: ClientsviewComponent;
  let fixture: ComponentFixture<ClientsviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
