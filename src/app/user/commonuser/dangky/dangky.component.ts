import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { catchError, takeUntil, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-dangky',
  templateUrl: './dangky.component.html',
  styleUrls: ['./dangky.component.css']
})
export class DangkyComponent implements OnInit,OnDestroy {

  constructor(private title: Title, private builder: FormBuilder, private http: HttpClient, private router: Router,) {
  }
  form_dangky : FormGroup;
  submit_on: any = false;
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);
  ngOnInit(): void {
    this.title.setTitle("Đăng ký");
    this.form_dangky = this.builder.group({
      txthoten : ['', Validators.required],
      txtEmail : ['', Validators.required],
      txtPlace : ['', Validators.required],
      txtPhone : ['',Validators.required],
      txtPass : ['', Validators.required],
      txtReplayPass : ['', Validators.required]
    })
  }
  ngOnDestroy(){
    this.destroy.next(null);
  }
  result_phone:any = false;
  result_replaypass:any = false;
  keyup_sdt(phone_txt){
    if(Number.isInteger(parseInt(phone_txt)) && phone_txt.length == 10){
      $("#alter_sdt").text("");
      this.result_phone = true;
    }
    else{
      $("#alter_sdt").text("Số điện thoại chỉ có thể là chữ số và độ dài bằng 10 ký tự");
      this.result_phone = false;
    }
  }
  keyup_nlmk(pass_txt, replaypass_txt){
    if(pass_txt == replaypass_txt){
      $("#alter_nlmk").text("");
      this.result_replaypass = true;
    }
    else{
      $("#alter_nlmk").text("Mật khẩu không trùng khớp");
      this.result_replaypass = false;
    }
  }
  result_dk:any;
  dangky_(){
    this.submit_on = true;
    if(this.form_dangky.invalid){
      return;
    }
    if(this.result_phone && this.result_replaypass){
      console.log(this.form_dangky.value.txthoten);
      var form_data = {
        hoten:this.form_dangky.value.txthoten,
        sdt: this.form_dangky.value.txtPhone,
        email: this.form_dangky.value.txtEmail,
        diachi: this.form_dangky.value.txtPlace,
        password: this.form_dangky.value.txtPass,
        chucvu: 2
      }
      this.http.post("https://localhost:44327/api/user/dangky_user",form_data).pipe(takeUntil(this.destroy)).subscribe(ress=>{
        this.result_dk = ress;
        if(this.result_dk.ketqua == true){
          alert(this.result_dk.thongbao);
          this.router.navigate(['/']);
        }
        else{
          alert(this.result_dk.thongbao);
        }
      })
    }
  }
  display_mk(){
    if($("#mk_ i").attr('class') == "fa fa-eye"){
      $("#mk_").html('<i class="fa fa-eye-slash" aria-hidden="true"></i>');
      $("#input_mk").attr('type','text');
    } 
    else{
      $("#mk_").html('<i class="fa fa-eye" aria-hidden="true"></i>');
      $("#input_mk").attr('type','password');
    }
  }
}
