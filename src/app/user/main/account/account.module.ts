import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ChangepassComponent } from './changepass/changepass.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const account_routes : Routes =[
  {
    path:'thongtintaikhoan/:id',
    component: ProfileComponent
  },
  {
    path: 'thaydoimatkhau/:id',
    component : ChangepassComponent
  }
]

@NgModule({
  declarations: [ProfileComponent, ChangepassComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(account_routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
