import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListblogComponent } from './listblog/listblog.component';
import { DetailblogComponent } from './detailblog/detailblog.component';
import {Routes,RouterModule, Router} from "@angular/router";
const blogrouter: Routes = [
  {
    path:"danhsach",
    component: ListblogComponent
  },
  {
    path:":id",
    component:DetailblogComponent
  }
]

@NgModule({
  declarations: [ListblogComponent, DetailblogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(blogrouter)
  ]
})
export class BlogModule { }
