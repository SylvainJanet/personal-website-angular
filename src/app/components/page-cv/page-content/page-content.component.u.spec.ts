import { TestBed } from '@angular/core/testing';
import { PageContentComponent } from './page-content.component';

describe('CvSkillsComponent - unit', () => {
  let pageContentComponent: PageContentComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageContentComponent],
    });
  });

  describe('constructor', () => {
    beforeEach(() => {
      pageContentComponent = TestBed.inject(PageContentComponent);
    });
    it('should create', () => {
      expect(pageContentComponent)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    });
  });
});
