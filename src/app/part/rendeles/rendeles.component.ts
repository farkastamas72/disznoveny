import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';
import { KosarService } from 'src/app/services/kosar.service';

@Component({
  selector: 'app-rendeles',
  templateUrl: './rendeles.component.html',
  styleUrls: ['./rendeles.component.css']
})
export class RendelesComponent {
kosar:any;
cim:any;
nev:any;
noveny:any;
osszes:any;

constructor(private base:BaseService, private kosarService:KosarService, private router:Router){
this.kosarService.returnKosar().subscribe((res)=> this.kosar = res)
this.kosarService.returnOsszes().subscribe((res)=>this.osszes = res)
this.base.getNovenyData().snapshotChanges()
.pipe(
  map(
    (ch) => ch.map(
      (c) => ({key:c.payload.key, ...c.payload.val()})
    ))).subscribe((res)=>this.noveny = res)
}

tetelTorol(key:any){
  return this.kosarService.tetelTorol(key)

}

getNovenyNev(key:any){
let i = this.noveny.findIndex(
  (res:any) => res.key == key
)

return this.noveny[i].megnevezes
}


megRednel(){
  let body = {
    nev:this.nev,
    cim:this.cim,
    datum:new Date().toDateString(),
    tetel:this.kosar,
    statusz:"Leadva"
  }
  console.log(body)
  return this.base.megrendel(body).then(
    (res:any)=> this.router.navigate([''])
  )
}
}
