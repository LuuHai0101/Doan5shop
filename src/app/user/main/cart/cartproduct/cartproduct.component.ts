import { Component, OnInit, Injector } from '@angular/core';
import { baseComponent } from 'src/app/user/lib/base-component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartproduct',
  templateUrl: './cartproduct.component.html',
  styleUrls: ['./cartproduct.component.css']
})
export class CartproductComponent extends baseComponent implements OnInit {

  constructor(private injector:Injector, private active: Router) { 
    super(injector)
  }
  item: any;
  total: any;
  totalprice: any;
  ngOnInit(): void {
    this._cart.items.subscribe(res=>{
      this.item = res;
      console.log(res);
      this.total = this._cart.totalproduce();
      this.totalprice = this._cart.totalprice();
    })
  }
  deleteitem(mamon){
    this._cart.deleteItem(mamon);
    alert("Xoá thành công");
  }
  clearcart(){
    this._cart.clearCart();
    alert("Xoá thành công");
    this.active.navigate(["/"]);
  }
  changequantiti(id,soluong){
    if(Number.isInteger(soluong)){
      this._cart.addQty(id, soluong);
      alert("Sửa số lượng thành công");
    }
    else{
      alert("Nhập chữ số");
    }
  }
}
