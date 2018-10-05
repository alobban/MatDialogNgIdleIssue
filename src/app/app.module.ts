import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MaterialModules } from './material.module';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import { HelloComponent } from './hello.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    HelloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModules,
    HttpClientModule,
    BrowserAnimationsModule,
    NgIdleKeepaliveModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ MessageComponent ]
})
export class AppModule { }
