import { Component, OnInit } from '@angular/core';
import { HabilidadesService } from 'src/app/servicios/habilidades.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Habilidades } from '../../Modelos/habilidades.model';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css'],
})
export class HabilidadesComponent implements OnInit {
  mishabilidades: any;
  public hab: Habilidades;
  idusuario: number = 0;
  protocolo: string = '';

  constructor(private habilidades: HabilidadesService,private route: ActivatedRoute) {
    this.hab = {
      id: 1,
      nombre: '',
      imagen: '',
      porcentaje: 1,
      usuario: { id: 1 },
    };
  }

  ngOnInit(): void {
    this.habilidades.obtenerDatos().subscribe((data) => {
      this.mishabilidades = data.habilidades;
    });
  }

  onDelete(id: number) {
    this.protocolo = 'borrar/Habilidades/';
    
    console.log('la habilidad número '+ JSON.stringify(id) + ' fue borrada');

    this.habilidades.borrarDato(id, this.protocolo).subscribe((data) => {});

    // refresh
    this.habilidades.obtenerDatos().subscribe((data) => {
      this.mishabilidades = data.habilidades;
    });
  }

  onChange(id: number) {
    this.protocolo = 'crear/Habilidades/';
    
    this.route.paramMap.subscribe((ruta: ParamMap) => {
      this.idusuario = parseInt(ruta.get('ruta')!);

      this.hab = {
        id: id,
        nombre: 'juancho',
        imagen: '123151231312ghsac',
        porcentaje: 85,
        usuario: { id: this.idusuario },
      };

      console.log('la habilidad número '+ JSON.stringify(id) + ' fue editada');

      this.habilidades.cambiarDato(this.hab, this.protocolo).subscribe((data) => { });

      // refresh
      this.habilidades.obtenerDatos().subscribe((data) => {
      this.mishabilidades = data.habilidades;
      });

    });
  }
}
