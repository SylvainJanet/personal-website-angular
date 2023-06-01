import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvSkillBarComponent } from './cv-skill-bar.component';

describe('CvSkillBarComponent', () => {
  let component: CvSkillBarComponent;
  let fixture: ComponentFixture<CvSkillBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvSkillBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvSkillBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
