import { Component, OnInit, Injector, Injectable } from '@angular/core';
import { baseComponent } from 'src/app/user/lib/base-component';
import {Router} from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-followcart',
  templateUrl: './followcart.component.html',
  styleUrls: ['./followcart.component.css']
})
export class FollowcartComponent extends baseComponent implements OnInit {

  constructor(private injector:Injector, public rou:Router) { 
    super(injector)
  }
  user:any;
  item:any;
  ngOnInit(): void {
    this.user  = JSON.parse(localStorage.getItem("userlogin"));
    this._route.params.subscribe(params=>{
      if(this.user!=null){
        this._api.get_all("api/hoadon/get_all_don_hang_idkhach/"+this.user.id).subscribe(res=>{
          this.item = res;
          console.log(this.item);
        });
      }
      else{
        this.rou.navigate(['/dangnhap']);
      }
    })
  }
  changestate(id){
    this._api.get_all("api/hoadon/chuyen_doi_tinh_trang/"+id).subscribe(res=>{
      if(res){
        this._api.get_all("api/hoadon/get_all_don_hang_idkhach/"+this.user.id).subscribe(res=>{
          this.item = res;
        });
        alert("Chuyển trạng thái thành công");
      }
      else{
        alert("Chuyển trạng thái thất bại");
      }
    })
  }
}
