import { NgModule, APP_INITIALIZER } from '@angular/core';

// CUSTOM_ELEMENTS_SCHEMA
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared.module';

// translate
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// routing
import { InitRouting } from './init.routing';
// components
import { InitComponent } from '../components/init.component';
import { NotFoundComponent } from '../components/not-found.component';
// guard
// import { InitGuard } from './shared/guards/init.guard';

// service
import { Config } from '../services/config.service';
import { LanguageService } from '../services/language.service';
import { SocketService } from '../services/socket.service';
// import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}

export function languageOnInit(languageService: LanguageService) {
  return () => languageService.onInit();
}

export function socketOnInit(socketService: SocketService) {
  return () => socketService.onInit();
}

export function getConfig(config: Config) {
  // return async () => await config.onInit('http://localhost:4200/assets/config/config.json');
  return () => config.onInit();
}

@NgModule({
  declarations: [
    InitComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    InitRouting,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (HttpLoaderFactory),
          deps: [HttpClient]
      }
    })
  ],
  exports: [

  ],
  providers: [
    // LanguageService,
    // Config,
    // LogHelper,
    {
      provide: APP_INITIALIZER,
      useFactory: socketOnInit,
      deps: [SocketService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: languageOnInit,
      deps: [LanguageService],
      multi: true
    },    
    {
      provide: APP_INITIALIZER,
      useFactory: getConfig,
      deps: [Config],
      multi: true
    }
    // {
    //   provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    //   useValue: {
    //     duration: 2500,
    //     horizontalPosition: 'right',
    //     verticalPosition: 'bottom'
    //   }
    // }
  ],
  // schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [InitComponent]
})

export class InitModule { }
