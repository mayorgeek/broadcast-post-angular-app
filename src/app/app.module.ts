import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthModule} from "./auth/auth.module";
import {NgxWebstorageModule} from 'ngx-webstorage';
import {PostsModule} from "./posts/posts.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    PostsModule,
    NgxWebstorageModule.forRoot({
      prefix: 'angularapp'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
