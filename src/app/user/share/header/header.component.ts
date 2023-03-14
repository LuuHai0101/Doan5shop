import { Inject } from '@angular/compiler/src/core';
import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { baseComponent } from '../../lib/base-component';
import {LoginUserService} from 'src/app/user/lib/loginuser.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends baseComponent implements OnInit {
  private itemsSearch = new BehaviorSubject<any[]>([]);
  items = this.itemsSearch.asObservable();
  constructor(private injector: Injector,private _rou: Router, private login_be: LoginUserService) {
    super(injector)
   }
  item: any;
  itemuser: any;
  total:any=0;
  totalprice:any=0;
  itemcar:any;
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this._api.get_all("api/loaimon/get_all_loai_mon").subscribe(res=>{
        this.item = res;
        setTimeout(()=>{
          this.loadScripts();
        })
      })
      this.itemuser = JSON.parse(localStorage.getItem("userlogin"));
    });
    this._cart.items.subscribe(res=>{
      this.itemcar = res;
      if(this.itemcar == null){
        this.total = 0;
        this.totalprice = 0;
      }
      else{
        // let local_storage = JSON.parse(localStorage.getItem('cart'));
        // this.total = this._cart.totalproduce();
        this.total = this.itemcar.length;
        this.totalprice = 0;
        for(let x of this.itemcar){
          this.totalprice = this.totalprice + x.soluong * x.gia;
        }
        // this.totalprice = this._cart.totalprice();
        console.log(this.totalprice);
      }
    });
    this.login_be.user_behaviorS.subscribe(res=>{
      this.itemuser = JSON.parse(localStorage.getItem("userlogin"));
    })
  }
  deleteitem(mamon){
    this._cart.deleteItem(mamon);
    alert("Xoá thành công");
  }
  search(txtsearch,selectsearch){
    this._rou.navigate(['/timkiem',txtsearch,selectsearch]);    
  }
  dangnhap(){
    var url = this._rou.url;
    localStorage.setItem("url",url);
    this._rou.navigate(["/dangnhap"]);
  }
  dangxuat(){
    var url = this._rou.url;
    localStorage.removeItem("userlogin");
    // var url = window.location.href;
    // alert(url);
    var a = url.split('/');
    alert(a[1]=="taikhoan");
    switch (a.length) {  
      case 3:  
        if(a[1]=="giohang" && a[2]=="theodoidonhang"){
          window.location.href = "http://localhost:4200/";
          // this._rou.navigate(['/']);
          // window.location.reload();
        }
        else{
          window.location.reload();
        }
        break; 
      case 4:  
        if(a[1]=="taikhoan"){
          window.location.href = "http://localhost:4200/";
          // this._rou.navigate(['/']);
          // window.location.reload();
        }
        else{
          window.location.reload();
        }
        break;  
      default:  
        window.location.reload();
        break;  
    }
  }
}
