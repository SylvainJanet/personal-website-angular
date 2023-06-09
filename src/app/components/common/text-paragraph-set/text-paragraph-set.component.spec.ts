import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextParagraphSetComponent } from './text-paragraph-set.component';

describe('TextParagraphSetComponent', () => {
  let component: TextParagraphSetComponent;
  let fixture: ComponentFixture<TextParagraphSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextParagraphSetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextParagraphSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
