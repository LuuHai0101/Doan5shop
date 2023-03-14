import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {user} from "../../model/user";
import {Router} from '@angular/router';
import { throwIfEmpty } from 'rxjs/operators';
@Injectable({
    providedIn:"root"
})
export class LoginUserService {
    private UserLogin : BehaviorSubject<any> = new BehaviorSubject<any>([]);
    public user_behaviorS : Observable<user> = this.UserLogin.asObservable();
    constructor(private http: HttpClient, private router: Router){}
    result:any;
    login(a){
        this.UserLogin.next(a);
    }
}