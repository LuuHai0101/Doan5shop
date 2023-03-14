import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../lib/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authen:AuthenticationService) { }
  item:any;
  ngOnInit(): void {
    this.authen.user.subscribe(res=>{
      this.item = res;
    })
  }
  logout(){
    this.authen.logout();
  }
}
