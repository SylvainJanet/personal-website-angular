import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

const helloYou = (name: any) => {
  name = 'you' || name;
  console.log('hello' + name + '!');
};
