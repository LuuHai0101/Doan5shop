import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { baseComponent } from '../../lib/base-component';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider} from "angularx-social-login";
import {Title} from "@angular/platform-browser";
import {user} from 'src/app/model/user';
import {LoginUserService} from 'src/app/user/lib/loginuser.service';
declare var $:any;
@Component({
  selector: 'app-dangnhap',
  templateUrl: './dangnhap.component.html',
  styleUrls: ['./dangnhap.component.css']
})
export class DangnhapComponent extends baseComponent implements OnInit, OnDestroy{

  constructor(private injector:Injector, private http: HttpClient, private router: Router, private activa: ActivatedRoute, private authService: SocialAuthService, private title: Title, private login_:LoginUserService) { 
    super(injector)
  }
  ngOnInit(): void {
    this.title.setTitle("Đăng nhập");
    var use = localStorage.getItem("userlogin")??null;
    console.log(use);
    // if(use != null){
    //   this.router.navigate(['/trangchu']);
    // }
    document.addEventListener("keyup",function(event:KeyboardEvent){
      if(event.keyCode == 13){
        // this.loginuser(this.email,this.password);
        $("#login_").click();
      }
    })
  }
  ngOnDestroy(): void{

  }
  url_Fb:any;
  result:any;
  public signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data=>{
      var form_data ={
        chucvu: 2,
        diachi: '',
        email: data.email,
        hinhanh: data.photoUrl,
        hoten: data.name,
        idFb: data.id,
        sdt:''
      }
      this.http.post("https://localhost:44327/api/user/change_form_data_FB",form_data).subscribe(res=>{
        let local_host = localStorage.getItem("userlogin");
        var url = localStorage.getItem("url");
        if(local_host == null){                   
            local_host = JSON.stringify(res);
            localStorage.setItem("userlogin",local_host);
            this.router.navigate([url]);
          }
          else{
            this.router.navigate([url]);
          }
      })
      console.log(form_data);
    });
  }
  public loginuser(txtemail,txtpass){
    if(txtemail.length > 0 && txtpass.length > 0){
      this.http.get("https://localhost:44327/api/user/get_user?txtemail="+txtemail+"&&txtpass="+txtpass).subscribe(res=>{
        this.result = res;
          if(this.result != null){
              let local_host = localStorage.getItem("userlogin");
              var url = localStorage.getItem("url");
              if(local_host == null){                   
                  local_host = JSON.stringify(this.result);
                  localStorage.setItem("userlogin",local_host);
                  this.router.navigate([url]);
                  this.login_.login(this.result);
              }
              else{
                  this.router.navigate([url]);
                  // this.router.navigate(["/trangchu"]);
              }
          }
          else{
            alert("Đăng nhập thất bại, Kiểm tra lại email hoặc mật khẩu của bạn");
          }           
      });
    }
    else{
      if(txtemail.length == 0){
        $("#alter_tk").text("Không để tài khoảng trống");
      }
      else{
        $("#alter_tk").text("");
      }
      if(txtpass.length == 0){
        $("#alter_mk").text("Không để mật khẩu trống");
      }
      else{
        $("#alter_mk").text("");
      }
    }
  }
  email:any="";
  password:any="";
  change_tk(txtemail){
    if(txtemail.length == 0){
      $("#alter_tk").text("Không để tài khoảng trống");
    }
    else{
      this.email = txtemail;
      $("#alter_tk").text("");
    }
  }
  change_mk(txtpass){
    this.password = txtpass;
    if(txtpass.length == 0){
      $("#alter_mk").text("Không để mật khẩu trống");
    }
    else{
      $("#alter_mk").text("");
    }
  }
}
