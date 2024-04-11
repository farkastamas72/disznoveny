import { Component } from '@angular/core';
import { map } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';
import { KosarService } from 'src/app/services/kosar.service';

@Component({
  selector: 'app-novenyek',
  templateUrl: './novenyek.component.html',
  styleUrls: ['./novenyek.component.css']
})
export class NovenyekComponent {
novenyek:any
kosar:any;

constructor(private base:BaseService, private kosarService:KosarService){
  this.base.getNovenyData().snapshotChanges()
  .pipe(
    map(
      (ch) => ch.map(
        (c) => ({key:c.payload.key, ...c.payload.val()})
      ))).subscribe((res)=> this.novenyek = res)
}

addTetel(noveny:any,db:any){
  return this.kosarService.addTetel(noveny,db)
}
}
