import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvImgComponent } from './cv-img.component';

describe('CvImgComponent', () => {
  let component: CvImgComponent;
  let fixture: ComponentFixture<CvImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
