import { Component, OnInit, Injector } from '@angular/core';
import { baseComponent } from 'src/app/user/lib/base-component';

@Component({
  selector: 'app-productnew',
  templateUrl: './productnew.component.html',
  styleUrls: ['./productnew.component.css']
})
export class ProductnewComponent extends baseComponent implements OnInit {

  constructor(private injector:Injector) {
    super(injector)
   }
  itemnew:any;
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this._api.get_all("api/monan/get_mon_an_new").subscribe(res=>{
        this.itemnew = res;
        setTimeout(()=>{
          this.loadScripts();
        })
      })
    })
  }
  addcart(item){
    this._cart.addCartSL(item,1);
    alert("Thêm thành công");
  }
}
