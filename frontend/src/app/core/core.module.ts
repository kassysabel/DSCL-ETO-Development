import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';
// import { UrlService } from './services/url.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    // UrlService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpRequestInterceptor,
    //   multi: true
    // }
  ],
  declarations: []
})
export class CoreModule { }
