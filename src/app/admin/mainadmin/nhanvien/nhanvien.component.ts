import { Inject } from '@angular/compiler/src/core';
import { Component, OnInit, Injector } from '@angular/core';
import { baseadmincomponent } from '../../lib/base-component-admin';

@Component({
  selector: 'app-nhanvien',
  templateUrl: './nhanvien.component.html',
  styleUrls: ['./nhanvien.component.css']
})
export class NhanvienComponent extends baseadmincomponent implements OnInit {
  item:any;
  constructor(private injector:Injector) { 
    super(injector)
  }
  showDialog(){
    this.display = true;
  }
  display = false;
  ngOnInit(): void {
  }

}
