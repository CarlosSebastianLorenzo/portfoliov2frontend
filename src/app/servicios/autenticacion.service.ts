import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private url = environment.apiUrl;

  currentUserSubject: BehaviorSubject<any>;
  constructor(private http:HttpClient) { 
    console.log("Autenticacion ta funcando...");
  this.currentUserSubject= new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')||'{}'));
  }

  IniciarSesion(credenciales:any):Observable<any> {
    console.log(credenciales);
    return this.http.post(this.url+"/api/login", credenciales).pipe(map(data=>{

      sessionStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
      return data;
    }));
  }

  Registrarse(credenciales:any):Observable<String> {
    // console.log(credenciales);
    return this.http.post<String>(this.url+"/api/crear/Usuario", credenciales);

  }

  get UsuarioAutenticado(){
    return this.currentUserSubject.value;
  }

}
