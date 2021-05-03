import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppConfig } from '@app/app.config';
import { AppRoutingModule } from '@app/app-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AppErrorInterceptor, AppHttpInterceptor } from '@shared/interceptors';
import { DiscordService } from '@shared/services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from '@app/app.component';
import {
  AppOutletComponent,
  NavbarComponent,
  FooterComponent,
} from '@app/components';

export function AppInitializer(config: AppConfig) {
  return () => config.init();
}

@NgModule({
  declarations: [
    AppComponent,
    AppOutletComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: AppInitializer,
      deps: [AppConfig, HttpClient],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: AppErrorInterceptor,
      deps: [Router, DiscordService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
