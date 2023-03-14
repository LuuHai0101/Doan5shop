import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThongkeComponent } from './thongke/thongke.component';
import {Routes, RouterModule, Router} from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { MainadminComponent } from './mainadmin.component';
import { DangnhapComponent } from '../commonadmin/dangnhap/dangnhap.component';
import {ShareModule} from '../share/share.module';
import { from } from 'rxjs';
import { BananComponent } from './banan/banan.component';
import { BophanComponent } from './bophan/bophan.component';
import { PrimeNGConfig } from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoaimonComponent } from './loaimon/loaimon.component';
import { MonanComponent } from './monan/monan.component';
import { CKEditorModule } from 'ng2-ckeditor';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import { NhanvienComponent } from './nhanvien/nhanvien.component';
import { KhachhangComponent } from './khachhang/khachhang.component';
import { TaikhoanComponent } from './taikhoan/taikhoan.component';
import { PhieugoimonComponent } from './phieugoimon/phieugoimon.component';
import { KhachhangthanhtoanComponent } from './khachhangthanhtoan/khachhangthanhtoan.component';
import { CalamComponent } from './calam/calam.component';
import { SliderComponent } from 'src/app/user/share/slider/slider.component';
import { BinhluanComponent } from './binhluan/binhluan.component';
import { AuthGuard } from '../lib/auth.guard';
import { DonhangComponent } from './donhang/donhang.component';
const Mainadminrouter: Routes = [
  {
    path: '',
    component: MainadminComponent,
    children: [
      {
        path: '',
        component: ThongkeComponent
      },
      {
        path: 'thongke',
        component: ThongkeComponent
      },
      {
        path: 'banan',
        component: BananComponent
      },
      {
        path: 'bophan',
        component: BophanComponent
      },
      {
        path: 'loaimohinh',
        component: LoaimonComponent
      },
      {
        path: 'mohinh',
        component: MonanComponent
      },
      {
        path: 'nhanvien',
        component: NhanvienComponent
      },
      {
        path:'khachhang',
        component: KhachhangComponent
      },
      {
        path:'taikhoan',
        component: TaikhoanComponent
      },
      {
        path:'phieugoi',
        component: PhieugoimonComponent
      },
      {
        path:'thanhtoan',
        component: KhachhangthanhtoanComponent
      },
      {
        path:'calam',
        component: CalamComponent
      },
      {
        path:'slider',
        component: SliderComponent
      },
      {
        path:'binhluan',
        component: BinhluanComponent
      },
      {
        path:'donhang/:id',
        component: DonhangComponent
      }
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'dangnhap',
    component: DangnhapComponent
  }
]

@NgModule({
  declarations: [ThongkeComponent, MainadminComponent,BananComponent, BophanComponent, LoaimonComponent, MonanComponent, NhanvienComponent, TaikhoanComponent, PhieugoimonComponent,DangnhapComponent, DonhangComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(Mainadminrouter),
    ShareModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    CKEditorModule,
    FileUploadModule,
    ReactiveFormsModule,
    ToastModule,
    DropdownModule
  ]
})
export class MainadminModule {
  constructor(private primengConfig: PrimeNGConfig){}
 }
