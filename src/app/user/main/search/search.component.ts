import { Component, OnInit, Injector } from '@angular/core';
import { baseComponent } from '../../lib/base-component';
import {Router} from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent extends baseComponent implements OnInit {
  constructor(private injector:Injector, private _rou:Router) {
    super(injector)
  }
  grid = false;
  total = 0;
  pageSize = 6;
  pageIndex = 1;
  order = 1;
  id:any;
  pageend = 0; 
  item:any;
  txtseach:any;
  changesize(value){
    this.pageSize = value;
    if(this.pageIndex*this.pageSize>this.total){
      this.pageIndex = 1;
    }
    this._api.GetJsonAsyncSearch("api/monan/get_mon_an_by_search",this.id,this.pageSize,this.pageIndex,this.order,this.txtseach).subscribe(res=>{
      console.log(res);
      this.item = res.monans;
      this.total = res.total;
      this.pageend = Math.ceil(this.total/this.pageSize);
    })
  }
  changeorder(value){
    this.order = value;
    if(this.pageIndex*this.pageSize>this.total){
      this.pageIndex = 1;
    }
    this._api.GetJsonAsyncSearch("api/monan/get_mon_an_by_search",this.id,this.pageSize,this.pageIndex,this.order,this.txtseach).subscribe(res=>{
      console.log(res);
      this.item = res.monans;
      this.total = res.total;
      this.pageend = Math.ceil(this.total/this.pageSize);
    })
  } 
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this.txtseach = params["txtsearch"];
      this.id = params["loai"];
      if(this.pageIndex*this.pageSize>this.total){
        this.pageIndex = 1;
      }
      this._api.GetJsonAsyncSearch("api/monan/get_mon_an_by_search",this.id,this.pageSize,this.pageIndex,this.order,this.txtseach).subscribe(res=>{
        console.log(res);
        this.item = res.monans;
        this.total = res.total;
        this.pageend = Math.ceil(this.total/this.pageSize);
      })
    })
  }
  changegrid(){
    this.grid = !this.grid;
    console.log(this.grid);
  }
  createRange(n){
    var ds = [];
    for(var i = 1; i<=n;i++){
      ds.push(i);
    }
    return ds;
  }
  clickpagination(index){
    this.pageIndex= index;
    this._api.GetJsonAsyncSearch("api/monan/get_mon_an_by_search",this.id,this.pageSize,this.pageIndex,this.order,this.txtseach).subscribe(res=>{
      this.item = res.monans;
      this.total = res.total;
      this.pageend =  Math.ceil(this.total/this.pageSize);
    })
  }
  clickpaginationprev(){
    this.pageIndex = this.pageIndex - 1 < 1 ? 1 :  this.pageIndex - 1;
    this._api.GetJsonAsyncSearch("api/monan/get_mon_an_by_search",this.id,this.pageSize,this.pageIndex,this.order,this.txtseach).subscribe(res=>{
      this.item = res.monans;
      this.total = res.total;
      this.pageend = Math.ceil(this.total/this.pageSize);
    })
  }
  clickpaginationnext(){
    this.pageIndex= this.pageIndex + 1 > this.pageend ? this.pageend :  this.pageIndex + 1 ;
    this._api.GetJsonAsyncSearch("api/monan/get_mon_an_by_search",this.id,this.pageSize,this.pageIndex,this.order,this.txtseach).subscribe(res=>{
      this.item = res.monans;
      this.total = res.total;
      this.pageend = Math.ceil(this.total/this.pageSize);
    })
  }
  search(txtsearch){
    this.id = 0;
    this._rou.navigate(['/timkiem',txtsearch,this.id]);
  }
  addcart(item){
    this._cart.addCart(item);
    alert("Thêm thành công");
  }

}
