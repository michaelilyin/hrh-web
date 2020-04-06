import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ENVIRONMENT_INITIALIZER} from "./services/environment.service";
import {API_INTERCEPTOR} from "./interceptors/api.interceptor";
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ENVIRONMENT_INITIALIZER,

    API_INTERCEPTOR
  ]
})
export class CoreModule {
}
