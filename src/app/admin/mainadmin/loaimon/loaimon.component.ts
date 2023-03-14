import { Inject } from '@angular/compiler/src/core';
import { Component, OnInit, Injector } from '@angular/core';
import { baseadmincomponent } from '../../lib/base-component-admin';

@Component({
  selector: 'app-loaimon',
  templateUrl: './loaimon.component.html',
  styleUrls: ['./loaimon.component.css']
})
export class LoaimonComponent extends baseadmincomponent implements OnInit {
  constructor(private injector: Injector) { 
    super(injector)
  }
  first = 0;
  rows = 10;
  item: any;
  display = false;
  ngOnInit(): void {
    this._route.pramas.subscribe(pramas=>{
      this._api.get_all("api/loaimon/get_all_loai_mon").subscribe(res=>{
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
}
