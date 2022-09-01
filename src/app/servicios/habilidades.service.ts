import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {
  url: string = 'http://localhost:8080/';
  constructor(private http:HttpClient) { }

obtenerDatos(): Observable<any>
{
  return this.http.get<any>(this.url+"leer/Habilidades");
}
}
