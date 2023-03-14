import { Component, OnInit, Injector} from '@angular/core';
import { baseComponent } from '../lib/base-component';
import {ActivatedRoute} from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent extends baseComponent implements OnInit {

  constructor(private ij : Injector, private router : ActivatedRoute,private primengConfig:PrimeNGConfig) {
    super(ij);
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.router.params.subscribe(params=>{
      setTimeout(()=>{
        this.loadScripts();
      })
    });
  }
}
