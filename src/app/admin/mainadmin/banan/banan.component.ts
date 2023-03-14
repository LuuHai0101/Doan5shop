import { Component, OnInit, Injector } from '@angular/core';
import { banan } from 'src/app/model/banan';
import { baseadmincomponent } from '../../lib/base-component-admin';
import { HttpClient } from '@angular/common/http';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-banan',
  templateUrl: './banan.component.html',
  styleUrls: ['./banan.component.css'],
  providers: [MessageService]
})
export class BananComponent extends baseadmincomponent implements OnInit {
  display = false;
  displayedit = false;
  constructor(private _in: Injector, private _client: HttpClient,private messageService: MessageService){
    super(_in)   
  }
  first = 0;
  rows = 10;
  item: any;
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this._api.get_all('api/banan/get_all_banan').subscribe(res =>{
        this.item = res;
        setTimeout(()=>{
          this.loadScripts();
        })
      })
    })
  }
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
      this.first = this.first - this.rows;
  }

  reset() {
      this.first = 0;
  }

  isLastPage(): boolean {
      return this.item? this.first === (this.item.length - this.rows): true;
  }

  isFirstPage(): boolean {
    return this.item ? this.first === 0 : true;
  }
  showDialog(){
    this.display = true;
  }
  ma_edit:any;
  makhedit:any;
  showDialogdisplayedit(id){
    this.displayedit = true;
    this._client.get("https://localhost:44327/api/banan/get_banan_by_id/"+id).subscribe(res=>{
      this.ma_edit = res;
      console.log(this.ma_edit);
      this.makhedit = this.ma_edit.makh;
    })
  }
  changestate(id){
    this._client.post("https://localhost:44327/api/banan/Put_banan_state/"+id,{}).subscribe(res=>{
      if(res==true){
        this.messageService.add({severity:'success', summary: 'Thành công', detail: 'Sửa tình trạng thành công'});
        this._api.get_all('api/banan/get_all_banan').subscribe(res =>{
          this.item = res;
          if(this.item.tinhtrang == 0){

          }
        })
      }
      else{
        this.messageService.add({severity:'error', summary: 'Thất bại', detail: 'Sửa tình trạng thất bại'});
      }
    })
  }
  insert(sogheinsert){
    var ba:banan;
    alert(sogheinsert);
    this._client.post("https://localhost:44327/api/banan/create",{"soghe": sogheinsert,"tinhtrang":0,"makh":""}).subscribe(res=>{
      if(res==true){
        this.messageService.add({severity:'success', summary: 'Thành công', detail: 'Thêm thành công'});
        this._api.get_all('api/banan/get_all_banan').subscribe(res =>{
          this.item = res;
        })
        this.display = false;
      }
      else{
        this.messageService.add({severity:'error', summary: 'Thất bại', detail: 'Thêm thất bại'});
      }
    })
  }
  delete(id){
    this._client.delete("https://localhost:44327/api/banan/Delete_Banan/"+id).subscribe(res=>{
      if(res==true){
        this.messageService.add({severity:'success', summary: 'Thành công', detail: 'Xoá thành công'});
        this._api.get_all('api/banan/get_all_banan').subscribe(res =>{
          this.item = res;
        })
        this.display = false;
      }
      else{
        this.messageService.add({severity:'error', summary: 'Thất bại', detail: 'Xoá thất bại'});
      }
    })
  }
  reset_form(){

  }
  update(){
    this._client.get("https://localhost:44327/api/banan/Put_Banan_Makh?id="+this.ma_edit.id+"&&makh="+this.makhedit).subscribe(res=>{
      if(res==true){
        this.messageService.add({severity:'success', summary: 'Thành công', detail: 'Sửa thành công'});
        this._api.get_all('api/banan/get_all_banan').subscribe(res =>{
          this.item = res;
        })
        this.display = false;
      }
      else{
        this.messageService.add({severity:'error', summary: 'Thất bại', detail: 'Sửa thất bại'});
      }
    })
  }
}
