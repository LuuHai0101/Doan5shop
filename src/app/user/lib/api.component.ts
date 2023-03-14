import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {throwError as observableThrowError} from 'rxjs';
@Injectable({
    providedIn:'root',
})
export class ApiServices {
    public base_host = 'https://localhost:44327/';
    constructor (private _http:HttpClient, private router: Router){}
    post(url: string, obj: any){
        const body = JSON.stringify(obj);
        let cloneHeader: any = {};
        cloneHeader['content-type'] = 'application/json';
        const headerOptions = new HttpHeaders(cloneHeader);
        return this._http.post<any>(this.base_host + url, body, {headers: headerOptions}).pipe(map((res:any)=>{
            let json = res;
            return json;
        })).pipe(
            catchError((err:Response)=>{
                return this.handleError(err);
            })
        )
    }
    edit(url:string,obj:any){
        let cloneHeader : any = {};
        cloneHeader['content-type'] = 'application/json';
        const headerOptions = new HttpHeaders(cloneHeader);
        return this._http.put(this.base_host+url,obj,{headers: headerOptions}).pipe(map(res=>{
            let json = res;
            return json;
        })).pipe(
            catchError((err:Response)=>{
                return this.handleError(err);
            })
        )
    }
    get_all(url:any){
        let cloneHeader: any = {};
        cloneHeader['Content-Type'] = 'application/json';
        cloneHeader['Access-Control-Allow-Origin'] = '*';
        const headerOptions = new HttpHeaders(cloneHeader);
        return this._http.get<any>(this.base_host + url,{headers:headerOptions}).pipe(
            map((res:any)=>{
                let json = res;
                return json;
            })
        ).pipe(
            catchError((err:Response)=>{
                return this.handleError(err);
            })
        )
    }
    get_by_id(url:any, id:any){
        let cloneHeader: any = {};
        cloneHeader['Content-Type'] = 'application/json';
        const headerOptions = new HttpHeaders(cloneHeader);
        return this._http.get<any>(this.base_host + url +"/" + id,{headers: headerOptions}).pipe(
            map((res:any)=>{
                let json = res;
                return json;
            })
        ).pipe(
            catchError((err:Response)=>{
                return this.handleError(err);
            })
        )
    }
    GetJsonAsync(url:any,id:any,pageSize:any,pageIndex:any,order:any){
        let cloneHeader: any = {};
        cloneHeader['Content-Type'] = 'application/json';
        const headerOptions = new HttpHeaders(cloneHeader);
        return this._http.get<any>(this.base_host + url +"?id="+id+"&&pageSize="+pageSize+"&&pageIndex="+pageIndex+"&&order="+order,{headers: headerOptions}).pipe(
            map((res:any)=>{
                let json = res;
                return json;
            })
        ).pipe(
            catchError((err:Response)=>{
                return this.handleError(err);
            })
        )
    }
    GetJsonAsyncSearch(url:any,id:any,pageSize:any,pageIndex:any,order:any,search:any){
        let cloneHeader: any = {};
        cloneHeader['Content-Type'] = 'application/json';
        const headerOptions = new HttpHeaders(cloneHeader);
        return this._http.get<any>(this.base_host + url +"?id="+id+"&&pageSize="+pageSize+"&&pageIndex="+pageIndex+"&&order="+order+"&&search="+search,{headers: headerOptions}).pipe(
            map((res:any)=>{
                let json = res;
                return json;
            })
        ).pipe(
            catchError((err:Response)=>{
                return this.handleError(err);
            })
        )
    }
    create(url:any,object:any){
        let cloneHeader : any = {};
        cloneHeader['Content-Type'] = 'application/json';
        const headerOptions = new HttpHeaders(cloneHeader);
        return this._http.post<any>(this.base_host + url,object,{headers:headerOptions}).pipe(
            map((res:any)=>{
                let json = res;
                return json;
            })
        ).pipe(
            catchError((err:Response)=>{
                return this.handleError(err);
            })
        )
    }
    public handleError(error: any) {
        this.router.navigate(['/err']);
        console.log(error);
        return observableThrowError(error);
    }
}