import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkBarOnHoverComponent } from './link-bar-on-hover.component';

describe('LinkBarOnHoverComponent', () => {
  let component: LinkBarOnHoverComponent;
  let fixture: ComponentFixture<LinkBarOnHoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkBarOnHoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkBarOnHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
