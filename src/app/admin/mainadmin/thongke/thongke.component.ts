import { Component, OnInit, Injector} from '@angular/core';
import { baseComponent } from 'src/app/user/lib/base-component';

@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.css']
})
export class ThongkeComponent extends baseComponent implements OnInit {

  constructor(private injector: Injector) {
    super(injector)
  }
  thang: any;
  tong_tien:any;
  ngay_thang:any;
  binhluan: any;
  tong_thang:any;
  phan_tram: any;
  tong_ngay:any;
  binh_luan:any;
  danh_gia:any;
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this._api.get_all("api/hoadon/tk_mn").subscribe(res=>{
        this.tong_tien = res;
      });
      this._api.get_all("api/hoadon/tk_mn_thang").subscribe(res=>{
        this.tong_thang = res;
      });
      this._api.get_all("api/hoadon/tk_phan_tram").subscribe(res=>{
        this.phan_tram = res.toFixed(2);
      });
      this._api.get_all("api/hoadon/tk_mn_ngay_thang").subscribe(res=>{
        this.tong_ngay = res;
      });
      this._api.get_all("api/binhluan/get_sl_binh_luan").subscribe(res=>{
        this.binh_luan = res;
      });
      this._api.get_all("api/binhluan/get_binh_luan_all").subscribe(res=>{
        this.danh_gia = res;
      });
    })
    var time = new Date();
    this.thang = time.getMonth()+1;
    this.ngay_thang = time.getDate() +"/"+ (time.getMonth()+1)+"/"+time.getFullYear(); 
  }
  btn_display_bl(id){
    this._api.get_all("api/binhluan/an_binh_luan/"+id).subscribe(res=>{
      if(res){
        alert("Thao tác thành công");
        this._api.get_all("api/binhluan/get_binh_luan_all").subscribe(res=>{
          this.danh_gia = res;
        });
      }
      else{
        alert("Thao tác thất bại");
      }
    });
  }
}
