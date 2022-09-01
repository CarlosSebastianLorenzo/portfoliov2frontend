import { Component, OnInit } from '@angular/core';
import { HabilidadesService } from 'src/app/servicios/habilidades.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  mishabilidades:any;
  constructor(private habilidades:HabilidadesService) { }

  ngOnInit(): void {
    this.habilidades.obtenerDatos().subscribe(data =>{
      console.log("mis habilidades son"+JSON.stringify( data[2] ));
      this.mishabilidades=data;
    });
  }

  onDelete(id:number){
    this.habilidades.borrarDato(id).subscribe(data =>{
    console.log("el id numero "+JSON.stringify(data)+" fue borrado");
    })
  }

}
