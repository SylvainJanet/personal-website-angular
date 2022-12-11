import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBigComponent } from './navbar-big.component';

describe('NavbarBigComponent', () => {
  let component: NavbarBigComponent;
  let fixture: ComponentFixture<NavbarBigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarBigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
