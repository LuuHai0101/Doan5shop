import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from "./header/header.component";
import {Router, RouterModule} from "@angular/router";
import { from } from 'rxjs';
@NgModule({
  declarations: [FooterComponent,HeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    FooterComponent,
    HeaderComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ShareModule { }
