import { Component, OnInit } from '@angular/core';
import { HabilidadesService } from 'src/app/servicios/habilidades.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  mishabilidades:any;
 
  constructor(private habilidades:HabilidadesService, private route:ActivatedRoute) { }

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

 // onChange(id:number){
  //  this.habilidades.torque(id).subscribe(data =>{
  //  console.log("el id numero "+JSON.stringify(data)+"fue editado");
  //  }
 // }

}
