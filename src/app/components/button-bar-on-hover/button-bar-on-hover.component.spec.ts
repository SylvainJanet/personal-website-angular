import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonBarOnHoverComponent } from './button-bar-on-hover.component';

describe('ButtonBarOnHoverComponent', () => {
  let component: ButtonBarOnHoverComponent;
  let fixture: ComponentFixture<ButtonBarOnHoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonBarOnHoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonBarOnHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
