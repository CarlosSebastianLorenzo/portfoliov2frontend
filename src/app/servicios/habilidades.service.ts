import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HabilidadesComponent } from '../componentes/habilidades/habilidades.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs';
import { Habilidades } from '../Modelos/habilidades.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
  
})

export class HabilidadesService {
 
  private url = environment.apiUrl;
 
  constructor(private http:HttpClient, private router:Router, private route: ActivatedRoute) { }
  
obtenerDatos(): Observable<any>
{
  let id = this.router.url
  return this.http.get<any>(this.url+'/api'+id);
}

borrarDato(id:number): Observable<any>
{
  return this.http.delete<any>(this.url+'/borrar/Habilidades/'+id);
}

cambiarDato(hab:Habilidades): Observable<Habilidades>
{
  return this.http.post<Habilidades>(this.url+'/crear/Habilidades/', hab);
}

}
