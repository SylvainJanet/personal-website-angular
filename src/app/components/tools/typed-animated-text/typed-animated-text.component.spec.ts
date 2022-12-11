import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypedAnimatedTextComponent } from './typed-animated-text.component';

describe('TypedAnimatedTextComponent', () => {
  let component: TypedAnimatedTextComponent;
  let fixture: ComponentFixture<TypedAnimatedTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypedAnimatedTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypedAnimatedTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
