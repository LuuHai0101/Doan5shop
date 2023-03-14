import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailproductComponent } from './detailproduct.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
const productrouter: Routes =[
  {
    path: "\:id",
    component:DetailproductComponent,
  }
]

@NgModule({
  declarations: [DetailproductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(productrouter),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DetailproductModule { }
