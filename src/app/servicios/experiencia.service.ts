import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Experiencias } from '../Modelos/experiencia.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  private url = environment.apiUrl;

  constructor(private http:HttpClient, private router:Router, private route: ActivatedRoute) { }

  obtenerDatos(): Observable<any>
  {
    let id = this.router.url
    return this.http.get<any>(this.url+id);
  }
  
  borrarDato(id:number): Observable<any>
  {
    return this.http.delete<any>(this.url+'borrar/Experiencia/'+id);
  }
  
  cambiarDato(exp:Experiencias): Observable<Experiencias>
  {
    return this.http.post<Experiencias>(this.url+'crear/Experiencia/', exp);
  }  
}
