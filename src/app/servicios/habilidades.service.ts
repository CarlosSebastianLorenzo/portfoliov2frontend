import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HabilidadesComponent } from '../componentes/habilidades/habilidades.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs';
import { Habilidades } from '../Modelos/habilidades.model';


@Injectable({
  providedIn: 'root'
  
})

export class HabilidadesService {
 
  url: string = 'http://localhost:8080/';
  constructor(private http:HttpClient, private router:Router, private route: ActivatedRoute) { }
  
obtenerDatos(): Observable<any>
{
  let id = this.router.url
  console.log(id);
   return this.http.get<any>(this.url+id);
}

borrarDato(id:number,protocolo:string): Observable<any>
{
  return this.http.delete<any>(this.url+protocolo+id);
}

cambiarDato(hab:Habilidades,protocolo:string): Observable<Habilidades>
{
  return this.http.post<Habilidades>(this.url+protocolo, hab);
}

}
