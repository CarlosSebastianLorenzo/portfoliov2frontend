import { Component, OnInit } from '@angular/core';
import { HabilidadesService } from 'src/app/servicios/habilidades.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habilidades } from '../../Modelos/habilidades.model';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  mishabilidades:any;
  public hab: Habilidades;
  idusuario:number=0;
  constructor(private habilidades:HabilidadesService, private route:ActivatedRoute) { 
    this.hab={
      "id" : 1,
    "nombre" : "",
    "imagen" : "",
    "porcentaje" : 1,
    "usuario" : { "id" : 1 }
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((pepe: ParamMap) => {
      console.log('Esto recibo desde url:', pepe.get('ruta'));
     
    }); 
    
    
      this.habilidades.obtenerDatos().subscribe(data =>{
      console.log("mis habilidades son"+JSON.stringify( data.habilidades ));
      this.mishabilidades=data.habilidades;
    });
  }

  onDelete(id:number){
    console.log("el id numero "+JSON.stringify(id)+" fue borrado");
    this.habilidades.borrarDato(id).subscribe(data =>{
     
    })
  }

  onChange(id:number){
    this.route.paramMap.subscribe((pepe: ParamMap) => {
      console.log('el usuario es:', pepe.get('ruta'));
      this.idusuario = parseInt(pepe.get('ruta')!);
            
    this.hab = {
      "id" : id,
      "nombre" : "juancho",
      "imagen" : "123151231312ghsac",
      "porcentaje" : 35,
      "usuario" : { "id" : this.idusuario }
  }
  
    this.habilidades.cambiarDato(this.hab).subscribe(data =>{
    console.log("el objeto "+data+"fue editado");
    })
    });
  }

}
