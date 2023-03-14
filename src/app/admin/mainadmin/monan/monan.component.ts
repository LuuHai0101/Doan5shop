import { Component, OnInit, Injector, ViewChild, ElementRef} from '@angular/core';
import { baseadmincomponent } from '../../lib/base-component-admin';
import {MessageService} from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';
declare var CKEDITOR: any;
declare var $:any;
@Component({
  selector: 'app-monan',
  templateUrl: './monan.component.html',
  styleUrls: ['./monan.component.css'],
  providers: [MessageService]
})
export class MonanComponent extends baseadmincomponent implements OnInit {
  @ViewChild('close_mn') close_mn: ElementRef;
  constructor(private injector: Injector, private messageService: MessageService, private http: HttpClient) {
    super(injector)
  }
  first = 0;
  rows = 5;
  item: any;
  ckeditorContent: any;
  txttenmon:any;
  txtdonvi:any;
  txtdongia: any;
  display = false;
  uploadedFiles: any[]=[];
  tenmon:any;
  protocol:string;
  bophan:any;
  selectloai: any = 1;
  base64:any = "";
  file:any;
  checklm: any = 0;
  ngOnInit(): void {
    this._route.params.subscribe(parmas=>{
      this._api.get_all("api/loaimon/get_all_loai_mon").subscribe(res=>{
        this.bophan = res;
        this.selectloai = this.bophan[0].id;
      })
      this._api.get_all("api/monan/get_all_mon_an").subscribe(res=>{
        this.item = res;
      })
    })
    CKEDITOR.on('instanceCreated', function (event, data) {
      var editor = event.editor,
      element = editor.element;
      editor.name = "content"
   });
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
    $("#imgTest").html("");
    this.display = true;
    this.protocol="create";
    this.txttenmon = "";
    this.txtdonvi = "";
    this.txtdongia = "";
    this.checklm = 0;  
    $("#formFile").val("");
    CKEDITOR.instances.content.setData("");
  }
  display_lma(idloaimon, bophan){
    for(var i=0;i<bophan.length;i++){
      if(idloaimon == bophan[i].id){
        return bophan[i].tenloai;
      }
    }
  }
  
  sing_mn:any;
  showDialogedit(id){
    this.display = true;
    this.protocol="edit";
    this._api.get_all("api/monan/"+id).subscribe(res=>{
      this.sing_mn = res;
      console.log(this.sing_mn);
      this.txttenmon = this.sing_mn.tenmon;
      this.txtdonvi = this.sing_mn.donvitinh;
      this.txtdongia = this.sing_mn.gia;
      // this.ckeditorContent = this.sing_mn.mota;
      CKEDITOR.instances.content.setData(this.sing_mn.mota);
      this.checklm = this.sing_mn.idloaimon;
      $("#imgTest").html('<img src="../../../../assets/images/product/'+this.sing_mn.hinhanh+'" style="width: 100px; height: 100px;">');
    })
  }
  changeImga(event){
    this.file = event.target;
    console.log(URL.createObjectURL(event.target.files[0]));
    $("#imgTest").html('<img src="'+URL.createObjectURL(event.target.files[0])+'" style="width: 100px; height: 100px;">');
  }
  change_lmn(sel_lma){
    this.selectloai= sel_lma;
  }
  // onUploadFile(event){
  //   for(let file of event.files) {
  //     this.uploadedFiles.push(file);
  //     this.encodeImageFileAsURL(file);
  //     console.log(this.base64);
  //   }
  //   this.messageService.add({severity:'success', summary: 'Thành công', detail: 'Tải ảnh thành công'});
  // }
  luu1(){
    console.log(CKEDITOR.instances.content.setData("Tào lao không à"));
  }
  checkrong(a,b,c){
    if(a.length==0){
      $("#"+c).text(b);
      return false;
    }
    else{
      $("#"+c).text("");
      return true;
    }
  }
  checkso(a,b,c){
    if(Number.isInteger(parseInt(a))){
      $("#"+c).text("");
      return true;
    }
    $("#"+c).text(b);
    return false;
  }
   luu(){
    console.log(this.protocol);
    this.getEncodeFromImage(this.file).subscribe((data: any): void => {
      this.base64 = data==null?"":data;
      if(this.protocol=="create"){   
        let formdata ={
          tenmon:this.txttenmon,
          donvitinh:this.txtdonvi,
          gia:parseInt(this.txtdongia),
          mota:this.ckeditorContent,
          hinhanh:this.base64,
          idloaimon:parseInt(this.selectloai)
        }
        if(this.checkrong(this.txttenmon,"Tên mô hình không được rỗng","alter_tm")&&this.checkrong(this.base64,"Hình ảnh không được để trống","alter_ha")&&this.checkrong(this.txtdonvi,"Đơn vị tính không được để trống","alter_dv")&&this.checkso(this.txtdongia,"Đơn giá kiểu số và không để trống","alter_dg")){
          this.http.post('https://localhost:44327/api/monan/create_mon_an',formdata).subscribe(res=>{
            this.display = false;
            if(res==true){
              this.close_mn.nativeElement.click();
              this.messageService.add({severity:'success', summary: 'Thành công', detail: 'Thêm mô hình thành công'});
              this._api.get_all("api/monan/get_all_mon_an").subscribe(res=>{
                this.item = res;
              })
            }
            else{
              this.messageService.add({severity:'error', summary: 'Thất bại', detail: 'Thêm mô hình thất bại'});
            }
          })
          console.log(formdata);
        }
      }
      if(this.protocol=="edit"){
        let formdata ={
          tenmon:this.txttenmon,
          donvitinh:this.txtdonvi,
          gia:parseInt(this.txtdongia),
          mota:this.ckeditorContent,
          hinhanh:this.base64,
          idloaimon:parseInt(this.selectloai)
        }
        console.log(formdata);
        if(this.checkrong(this.txttenmon,"Tên mô hình không được rỗng","alter_tm")&&this.checkrong(this.txtdonvi,"Đơn vị tính không được để trống","alter_dv")&&this.checkso(this.txtdongia,"Đơn giá kiểu số và không để trống","alter_dg")){
          this.http.put('https://localhost:44327/api/monan/edit_mon_an/'+this.sing_mn.id,formdata).subscribe(res=>{
            this.display = false;
            if(res==true){
              this.close_mn.nativeElement.click();
              this.messageService.add({severity:'success', summary: 'Thành công', detail: 'Sửa mô hình thành công'});
              this._api.get_all("api/monan/get_all_mon_an").subscribe(res=>{
                this.item = res;
              })
            }
            else{
              this.messageService.add({severity:'error', summary: 'Thất bại', detail: 'Sửa mô hình thất bại'});
            }
          })
        }
      }
    })
   }
   delete_mn(id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Bạn chắc chắn chứ?',
      text: "Bạn sẽ không thể thiết lập lại điều này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có, xoá nó',
      cancelButtonText: 'Không, trở về',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete("https://localhost:44327/api/monan/delete_mon_an/"+id).subscribe(res=>{
          if(res){
            this._api.get_all("api/monan/get_all_mon_an").subscribe(res=>{
              this.item = res;
            })
            swalWithBootstrapButtons.fire(
              'Xoá thành công',
              'Tệp của bạn đã bị xóa.',
              'success'
            )
          }
          else{
            swalWithBootstrapButtons.fire(
              'Xoá thất bại',
              'Tệp của bạn còn nguyên :)',
              'error'
            )
          }
        })        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Đã hủy',
          'Tệp của bạn đã an toàn :)',
          'error'
        )
      }
    });
   }
}
