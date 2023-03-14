import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../lib/authentication.service';

@Component({
  selector: 'app-dangnhap',
  templateUrl: './dangnhap.component.html',
  styleUrls: ['./dangnhap.component.css']
})
export class DangnhapComponent implements OnInit {
  returnUrl: string;
  txtemail:any;
  txtpassword:any;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private router: Router,private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  onlogin(txtemail, txtpassword){
    this.authenticationService.login(txtemail,txtpassword);
    this.router.navigate(["/admin"]);
  }
  
}
