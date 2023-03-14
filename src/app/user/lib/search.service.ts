import{BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
@Injectable({
    providedIn: 'root',
})
export class LoginService{
    value:searchvalue;
    constructor(private _rou:Router){}
    ngOnInit():void{
        
    }
    addsearch(txtuser, idpass, url){
        let local = JSON.parse(localStorage.getItem('login'));
        if(local == null){
            local = [];
        }
        this._rou.navigateByUrl(url);
    }
}
interface searchvalue{
    search:string;
    idloai: number;
}