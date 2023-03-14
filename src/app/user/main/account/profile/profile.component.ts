import { Component, OnInit, Injector} from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {Title} from "@angular/platform-browser";
import {baseComponent} from "src/app/user/lib/base-component";
import Swal from 'sweetalert2';
import {LoginUserService} from 'src/app/user/lib/loginuser.service';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends baseComponent implements OnInit {
  form_changeI : FormGroup;
  constructor(private http: HttpClient, private __route: ActivatedRoute, private title: Title, private injector: Injector, private login_be: LoginUserService, private builder: FormBuilder) { 
    super(injector)
  }
  click_profile:any=true;
  user_login:any;
  user_profile: any;
  on_submit: any = false;
  ngOnInit(): void {
    this.title.setTitle("Thông tin tài khoản");
    this.user_login = JSON.parse(localStorage.getItem("userlogin"));
    this.__route.params.subscribe(params=>{
      this.http.get("https://localhost:44327/api/user/get_user_id/"+this.user_login.id).subscribe(res=>{
        this.user_profile = res;
        var a_day = this.user_profile.ngaysinh.split('T');
        this.form_changeI = this.builder.group({
          txt_ht : [this.user_profile.hoten,Validators.required],
          txt_ns : [a_day[0], Validators.required],
          txt_dc : [this.user_profile.diachi, Validators.required],
          txt_sdt : [this.user_login.sdt, Validators.required]
        })
        
      })
    })
  }
  co_change_sdt:any = true;
  change_sdt_(sdt_txt){
    var a = sdt_txt.trim();
    alert(a);
    if(Number.isInteger(Number.parseInt(a))&&a.length==10){
      $("#alert_sdt_2").text("");
      this.co_change_sdt = true;
    }
    else{
      $("#alert_sdt_2").text("Nhập kiểu số và độ dài bằng 10 ký tự");
      this.co_change_sdt = false;
    }
  }
  change_imformation_: any;
  change_information(){
    this.on_submit = true;
    if(this.form_changeI.invalid){
      return;
    }
    if(this.co_change_sdt){
      var formdata={
        id: this.user_login.id,
        hoten: this.form_changeI.value.txt_ht,
        ngaysinh: this.form_changeI.value.txt_ns,
        sdt: this.form_changeI.value.txt_sdt,
        diachi: this.form_changeI.value.txt_dc
      }
      this.http.put("https://localhost:44327/api/user/update_profile/"+this.user_login.id,formdata).subscribe(res=>{
        this.change_imformation_ = res;
        console.log(this.change_imformation_);
        if(this.change_imformation_.alter){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cập nhật thông tin thành công',
            showConfirmButton: false,
            timer: 1500
          })
          this.user_profile = this.change_imformation_.result;
          localStorage.setItem("userlogin",JSON.stringify(this.change_imformation_.result));
          this.login_be.login(this.change_imformation_.result);
        }
        else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Cập nhật thông tin thất bại',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }
  }
  change_data: any;
  change_img(event){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Bạn chắc chứ?',
      text: "Đổi ảnh đại diện của bạn!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đúng',
      cancelButtonText: 'Trở về',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.getEncodeFromImage(event.target).subscribe(data=>{
          const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
          }
          var formdata = {
            id: this.user_login.id,
            hinhanh: data
          }
          console.log(formdata);
          this.http.post("https://localhost:44327/api/user/change_img/"+this.user_login.id,JSON.stringify(formdata), httpOptions).subscribe(res=>{
            this.change_data = res;
            console.log(this.change_data);
            if(this.change_data.alter){
              swalWithBootstrapButtons.fire(
                'Đổi thành công',
                'Ảnh đại diện của bạn đổi thành công',
                'success'
              )
              this.user_profile = this.change_data.result;
              console.log(this.user_profile);
              localStorage.setItem("userlogin",JSON.stringify(this.change_data.result));
              this.login_be.login(this.change_data.result);
            }
            else{
              swalWithBootstrapButtons.fire(
                'Đổi thất bại',
                'Ảnh đại diện của bạn chưa được đổi',
                'error'
              )
            }
          })
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Huỷ',
          'Ảnh đại diện của bạn an toàn :)',
          'error'
        )
      }
    })
  }
}
