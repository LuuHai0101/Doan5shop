import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule, Router} from '@angular/router';
import {DetailproductComponent} from './detailproduct/detailproduct.component';
import{ListproductComponent}from './listproduct/listproduct.component';
import { from } from 'rxjs';
const productrouter: Routes =[
  {
    path:"danhsach",
    component: ListproductComponent,
  },
  {
    path: "\:id",
    component:DetailproductComponent,
  }
]
@NgModule({
  declarations: [DetailproductComponent,ListproductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(productrouter)
  ]
})
export class ProductModule { }
