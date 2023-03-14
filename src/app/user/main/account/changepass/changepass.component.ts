import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2'
declare var $:any;
@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {

  constructor(private http: HttpClient, private rou: ActivatedRoute) { }
  id:any;
  ngOnInit(): void {
    this.rou.params.subscribe(params=>{
      this.id = params["id"];
    })
  }
  display_pass(b,c){
    var a = $("#"+c).attr('class');
    if(a=='fa fa-eye-slash'){
      $("#"+c).attr('class','fa fa-eye');
      $("#"+b).attr('type','text');
    }
    else{
      $("#"+c).attr('class','fa fa-eye-slash');
      $("#"+b).attr('type','password');
    }
  }
  check_emty(a,b,c){
    if(a.length==0){
      $("#"+c).text(b);
      return false;
    }
    else{
      $("#"+c).text('');
      return true;
    }
  }
  result:any;
  change_pass(new_pass, old_pass){
    if(this.check_emty(new_pass,"Mật khẩu mới không trống","alter_new")&&this.check_emty(old_pass,"Mật khẩu cũ không trống","alter_old")){
      this.http.get("https://localhost:44327/api/user/change_pass?id="+this.id+"&&pass_new="+new_pass+"&&pass_old="+old_pass).subscribe(res=>{
        this.result = res;
        if(this.result.ketqua){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: this.result.thongbao,
            showConfirmButton: false,
            timer: 1500
          })
        }
        else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: this.result.thongbao,
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }
  }
}
