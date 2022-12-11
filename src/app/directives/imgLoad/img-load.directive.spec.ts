import { ElementRef } from '@angular/core';
import { ImageService } from 'src/app/services/image/image.service';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { ImgLoadDirective } from './img-load.directive';

describe('ImgLoadDirective', () => {
  it('should create an instance', () => {
    const directive = new ImgLoadDirective(
      new ElementRef(null),
      new ImageService(new PreloaderService())
    );
    expect(directive).toBeTruthy();
  });
});
