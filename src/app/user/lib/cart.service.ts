import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class CartService{
    private itemsSubjet = new BehaviorSubject<any[]>([]);
    items = this.itemsSubjet.asObservable();
    constructor(){
        let local_storage = JSON.parse(localStorage.getItem('cart'));
        if(!local_storage){
            local_storage = [];
        }
        this.itemsSubjet.next(local_storage);
    }
    new_cart:cart;
    addCart(item){
        item.soluong = 1;
        let local_storage:any;
        if(localStorage.getItem('cart') == null){
            local_storage = [item];
        }
        else{
            local_storage = JSON.parse(localStorage.getItem('cart'));
            let ok = true;
            for(let x of local_storage){
                if(x.id  == item.id){
                    x.soluong = x.soluong + 1;
                    ok = false;
                }
            }
            if(ok == true){
                local_storage.push(item);
            }
        }
        localStorage.setItem('cart',JSON.stringify(local_storage));
        this.itemsSubjet.next(local_storage);
    }
    addCartSL(item,quantity){
        item.soluong = quantity;
        let local_storage:any;
        if(localStorage.getItem('cart') == null){
            local_storage = [item];
        }
        else{
            local_storage = JSON.parse(localStorage.getItem('cart'));
            let ok = true;
            for(let x of local_storage){
                if(x.id  == item.id){
                    x.soluong = parseInt(x.soluong) + parseInt(quantity);
                    ok = false;
                }
            }
            if(ok == true){
                local_storage.push(item);
            }
        }
        localStorage.setItem('cart',JSON.stringify(local_storage));
        this.itemsSubjet.next(local_storage);
    }
    deleteItem(id){
        let local_storage = JSON.parse(localStorage.getItem('cart'));
        local_storage = local_storage.filter(x=>x.id != id);
        localStorage.setItem('cart',JSON.stringify(local_storage));
        this.itemsSubjet.next(local_storage);
    }
    addQty(id, soluong){
        let local_storage = JSON.parse(localStorage.getItem('cart'));
        for(let x of local_storage){
            if(x.id == id){
                x.soluong = soluong;
            }
        }
        localStorage.setItem('cart',JSON.stringify(local_storage));
        this.itemsSubjet.next(local_storage);
    }
    getallitem(){
        let local_storage = JSON.parse(localStorage.getItem('cart'));
        return local_storage;
    }
    totalproduce(){
        let local_storage = JSON.parse(localStorage.getItem('cart'));
        if(local_storage.length !=0){
            return local_storage.length;
        }
       return 0;
    }
    totalprice(){
        let local_storage = JSON.parse(localStorage.getItem('cart'));
        var total = 0;
        for(let x of local_storage){
            total = total + x.soluong * x.gia;
        }
        return total;
    }
    clearCart(){
        localStorage.removeItem('cart');
        let local_storage = JSON.parse(localStorage.getItem('cart'));
        this.itemsSubjet.next(local_storage);
    }
}
interface cart
{
    id : number;
    hinhanh: string;
    soluong: number;
    gia: number;
}