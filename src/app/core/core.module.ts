import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ENVIRONMENT_INITIALIZER} from "./services/environment.service";
import {API_INTERCEPTOR} from "./interceptors/api.interceptor";


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ENVIRONMENT_INITIALIZER,

    API_INTERCEPTOR
  ]
})
export class CoreModule {
}
