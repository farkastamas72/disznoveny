import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Noveny } from '../model/noveny';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
novenyRef: AngularFireList<Noveny>
rendelesRef: AngularFireList<any>
  constructor(private db:AngularFireDatabase) {
    this.novenyRef = this.db.list("/novenyek")
    this.rendelesRef = this.db.list("/rendeles")
   }

   getNovenyData(){
    return this.novenyRef
   }

   megrendel(body:any){
    return this.rendelesRef.push(body)
   }
}
