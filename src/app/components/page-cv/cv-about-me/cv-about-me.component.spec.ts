import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvAboutMeComponent } from './cv-about-me.component';

describe('CvAboutMeComponent', () => {
  let component: CvAboutMeComponent;
  let fixture: ComponentFixture<CvAboutMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvAboutMeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvAboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
