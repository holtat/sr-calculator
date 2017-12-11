import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { bootloader, hmrModule } from '@angularclass/hmr';

import { AppModule } from './app/app.module';
import './styles/main.scss';

if (process.env.ENV === 'production') {
  enableProdMode();
}

const boot = () =>
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(ngModuleRef => hmrModule(ngModuleRef, module));

bootloader(boot);

