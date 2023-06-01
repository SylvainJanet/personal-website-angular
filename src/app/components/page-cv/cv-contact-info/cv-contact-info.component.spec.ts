import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvContactInfoComponent } from './cv-contact-info.component';

describe('CvContactInfoComponent', () => {
  let component: CvContactInfoComponent;
  let fixture: ComponentFixture<CvContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvContactInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
