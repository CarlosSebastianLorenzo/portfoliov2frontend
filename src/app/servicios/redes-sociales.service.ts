import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RedesSociales } from '../Modelos/redes-sociales.model';

@Injectable({
  providedIn: 'root'
})
export class RedesSocialesService {

  private url = environment.apiUrl;

  constructor(private http:HttpClient,
              private router:Router,
              private route: ActivatedRoute) { }

   obtenerDatos(): Observable<any>
  {
    let id = this.router.url
    return this.http.get<any>(this.url+'/api'+id);
  }

  borrarDato(id:number): Observable<any>
  {
    return this.http.delete<any>(this.url+'/borrar/RedesSociales/'+id);
  }

  cambiarDato(red:RedesSociales): Observable<RedesSociales>
  {
    return this.http.post<RedesSociales>(this.url+'/crear/RedesSociales/', red);
  }              
}
