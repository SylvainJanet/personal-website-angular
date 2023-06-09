import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSubParagraphComponent } from './text-sub-paragraph.component';

describe('TextSubParagraphComponent', () => {
  let component: TextSubParagraphComponent;
  let fixture: ComponentFixture<TextSubParagraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextSubParagraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextSubParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
