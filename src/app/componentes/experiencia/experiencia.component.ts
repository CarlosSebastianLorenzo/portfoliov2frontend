import { Component, OnInit } from '@angular/core';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Experiencias } from 'src/app/Modelos/experiencia.model';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  misexperiencias:any;
  public exp: Experiencias;
  idusuario: number = 0;
  protocolo: string = '';

  constructor(private experiencias: ExperienciaService, private route: ActivatedRoute) {
    this.exp ={
      id: 1,
      empresa : '',
      puesto : '',
      fechaInicio : new Date(2022,10,2),
      fechaFinal : new Date(2022,10,2),
      logo : '',
      actividades : '',
      usuario : { id : 1 }
    }
   }

  ngOnInit(): void {
    this.experiencias.obtenerDatos().subscribe((data)=>{
      this.misexperiencias = data.experiencia;
    });
  }

  onDelete(id: number) {
    
    console.log('la experiencia número '+ JSON.stringify(id) + ' fue borrada');

    this.experiencias.borrarDato(id).subscribe((data) => {});

    // refresh
    this.experiencias.obtenerDatos().subscribe((data)=>{
      this.misexperiencias = data.experiencia;
    });
  }

  onChange(id: number) {
    
    this.route.paramMap.subscribe((ruta: ParamMap) => {
      this.idusuario = parseInt(ruta.get('ruta')!);

      this.exp = {
      id: 1,
      empresa : 'Nasa',
      puesto : 'Dueño',
      fechaInicio : new Date(2022,10,2),
      fechaFinal : new Date(2022,10,2),
      logo : '123123',
      actividades : 'Jefe',
      usuario: { id: this.idusuario },
      };

      console.log('la experiencia número '+ JSON.stringify(id) + ' fue editada');

      this.experiencias.cambiarDato(this.exp).subscribe((data) => { });

      // refresh
      this.experiencias.obtenerDatos().subscribe((data)=>{
        this.misexperiencias = data.experiencia;
      });

    });
  }
}
