import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DangkyComponent} from './dangky/dangky.component';
import {DangnhapComponent} from './dangnhap/dangnhap.component';
import { Router, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DangkyComponent,DangnhapComponent, ErrorComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    DangnhapComponent,
    DangkyComponent,
    ErrorComponent
  ]
})
export class CommonuserModule { }
