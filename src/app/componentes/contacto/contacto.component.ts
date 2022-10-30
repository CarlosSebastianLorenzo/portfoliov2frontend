import { Component, OnInit } from '@angular/core';
import { AcercaDeService } from 'src/app/servicios/acerca-de.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  contacto: string;

  constructor(private acercaDe: AcercaDeService) {
    this.contacto = "carlossebastianlorenzo@gmail.com";
   }

  ngOnInit(): void {

    this.acercaDe.obtenerDatos().subscribe((data)=>{
      if(data.email!=null){
        this.contacto = data.email;
      }
      else{
        this.contacto = "carlossebastianlorenzo@gmail.com";
      }
    });
  }

}
