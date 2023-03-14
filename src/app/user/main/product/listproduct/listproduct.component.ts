import { Inject } from '@angular/compiler/src/core';
import { Component, OnInit, Injector } from '@angular/core';
import { RouteConfigLoadEnd } from '@angular/router';
import { baseComponent } from 'src/app/user/lib/base-component';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css'],
  providers:[MessageService]
})
export class ListproductComponent extends baseComponent implements OnInit {
  grid = false;
  constructor(private injector: Injector,private messageService: MessageService) {
    super(injector)
   }
  total = 0;
  pageSize = 6;
  pageIndex = 1;
  order = 1;
  id:any;
  pageend = 0; 
  changesize(value){
    this.pageSize = value;
    if(this.pageSize*this.pageIndex > this.total){
      this.pageIndex = 1;
    }
    this._api.GetJsonAsync("api/monan/get_mon_an_by_idlm",this.id,this.pageSize,this.pageIndex,this.order).subscribe(res=>{
      this.item = res.monans;
      this.total = res.total;
      this.pageend = Math.ceil(this.total/this.pageSize);
    })
  }
  changeorder(value){
    this.order = value;
    this._api.GetJsonAsync("api/monan/get_mon_an_by_idlm",this.id,this.pageSize,this.pageIndex,this.order).subscribe(res=>{
      this.item = res.monans;
      this.total = res.total;
      this.pageend = Math.ceil(this.total/this.pageSize);
    })
  }
  item:any;
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this.id = params["id"];
      this._api.GetJsonAsync("api/monan/get_mon_an_by_idlm",this.id,this.pageSize,this.pageIndex,this.order).subscribe(res=>{
        this.item = res.monans;
        this.total = res.total;
        console.log(this.item);
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
    this._api.GetJsonAsync("api/monan/get_mon_an_by_idlm",this.id,this.pageSize,this.pageIndex,this.order).subscribe(res=>{
      this.item = res.monans;
      this.total = res.total;
      this.pageend = Math.ceil(this.total/this.pageSize);
    })
  }
  clickpaginationprev(){
    this.pageIndex = this.pageIndex - 1 < 1 ? 1 :  this.pageIndex - 1;
    this._api.GetJsonAsync("api/monan/get_mon_an_by_idlm",this.id,this.pageSize,this.pageIndex,this.order).subscribe(res=>{
      this.item = res.monans;
      this.total = res.total;
      this.pageend = Math.ceil(this.total/this.pageSize);
    })
  }
  clickpaginationnext(){
    this.pageIndex= this.pageIndex + 1 > this.pageend ? this.pageend :  this.pageIndex + 1 ;
    this._api.GetJsonAsync("api/monan/get_mon_an_by_idlm",this.id,this.pageSize,this.pageIndex,this.order).subscribe(res=>{
      this.item = res.monans;
      this.total = res.total;
      this.pageend = Math.ceil(this.total/this.pageSize);
    })
  }
  addcart(item){
    this._cart.addCart(item);
    alert("Thêm thành công");
  }
}
