import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KosarService {
kosar:any[];
osszes:number;
kosarSub = new BehaviorSubject<any>(null)
OsszesSub = new BehaviorSubject<any>(null)


  constructor() {
    this.kosar = []
    this.osszes = 0
   }

   addTetel(noveny:any,db:any){

    let i = this.kosar.findIndex(
      (res:any) => res.key == noveny.key
    )

    if(i == -1 ) 
      this.kosar.push({key:noveny.key, db:db, ar:noveny.ar})
     
    else this.kosar[i].db = db

  this.osszes = this.osszes + db*noveny.ar

  this.OsszesSub.next(this.osszes)
  this.kosarSub.next(this.kosar)
   }

   tetelTorol(key:any){
    this.kosar = this.kosar.filter(
      (res:any) => res.key != key 
    )
    return this.kosarSub.next(this.kosar)
  }

   returnKosar(){
   return  this.kosarSub
   }
   returnOsszes(){
    return this.OsszesSub
   }
}
