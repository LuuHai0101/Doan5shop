import { Inject } from '@angular/compiler/src/core';
import { Component, OnInit, Injector } from '@angular/core';
import { baseComponent } from 'src/app/user/lib/base-component';

@Component({
  selector: 'app-productbest',
  templateUrl: './productbest.component.html',
  styleUrls: ['./productbest.component.css']
})
export class ProductbestComponent extends baseComponent implements OnInit {

  constructor(private injector:Injector) {
    super(injector)
   }
  itemrate:any;
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this._api.get_all("api/monan/get_mon_an_rate").subscribe(res=>{
        this.itemrate = res;
      })
    })
  }
  addcart(item){
      this._cart.addCartSL(item,1);
      alert("Thêm thành công");
  }
}
