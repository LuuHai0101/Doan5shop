import { Component, OnInit,Injector } from '@angular/core';
import { baseComponent } from '../../lib/base-component';
declare var window:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends baseComponent implements OnInit {

  constructor(private injector:Injector) { 
    super(injector)
  }
  itemblog:any;
  ngOnInit(): void {
    window.scroll(0,0);
    this._route.params.subscribe(params=>{
      this._api.get_all("api/tintuc/get_tin_tuc_noi_bat").subscribe(res=>{
        this.itemblog = res;
        console.log(res);
      })
    })
  }
  splittomtat(tomtat){
    var x = tomtat.split(' ');
    var z ="";
    for(var i = 0; i < 22; i++){
      z = z+" "+ x[i];
    }return z + " ...";
  }

}
