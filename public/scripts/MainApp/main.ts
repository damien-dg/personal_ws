/**
 * Created by damiendg on 2017-01-03.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from 'scripts/MainApp/triangle.builder.module.js';

let boot = document.addEventListener('DOMContentLoaded', () => {
    platformBrowserDynamic()
        .bootstrapModule(AppModule);
});

module.exports = boot;