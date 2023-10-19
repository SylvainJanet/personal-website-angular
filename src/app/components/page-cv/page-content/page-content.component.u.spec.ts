import { TestBed } from '@angular/core/testing';
import { PageContentComponent } from './page-content.component';

describe('PageContentComponent - unit', () => {
  let component: PageContentComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageContentComponent],
    });
  });

  describe('constructor', () => {
    beforeEach(() => {
      component = TestBed.inject(PageContentComponent);
    });
    it('should create', () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    });
  });
});
