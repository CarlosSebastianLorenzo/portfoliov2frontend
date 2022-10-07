import { Component, OnInit } from '@angular/core';
import { HabilidadesService } from 'src/app/servicios/habilidades.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Habilidades } from '../../Modelos/habilidades.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css'],
})
export class HabilidadesComponent implements OnInit {
  mishabilidades: any;
  habilidadesmodal: any;
  public hab: Habilidades;
  idusuario: number = 0;
  protocolo: string = '';
  formulario:FormGroup;
  

  constructor(private formBuilder: FormBuilder, private habilidades: HabilidadesService,private route: ActivatedRoute) {
    this.hab = {
      id: 1,
      nombre: '',
      imagen: '',
      porcentaje: 1,
      usuario: { id: 1 },
    };
    this.formulario=this.formBuilder.group({
      id:[''],
      nombre:['',[Validators.required]],
      imagen:[''],
      porcentaje: ['']
    })
  }

  ngOnInit(): void {
    this.habilidades.obtenerDatos().subscribe((data) => {
      this.mishabilidades = data.habilidades;
    });
    this.habilidadesmodal=[{
      nombre: '',
      imagen: '',
      porcentaje: 50,
    }]
  }
  refresh(milisegundos:number) {
         setTimeout(() => {
          this.habilidades.obtenerDatos().subscribe((data) => {
            this.mishabilidades = data.habilidades;
            });
         }, milisegundos);
  }

  onDelete(id: number) {
    
    console.log('la habilidad número '+ JSON.stringify(id) + ' fue borrada');

    this.habilidades.borrarDato(id).subscribe((data) => {});

    this.refresh(50);
  }

  openModal(habilidades:Habilidades){
    this.habilidadesmodal =[habilidades];
    setTimeout(() => {
      var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
      myModal.show();
    }, 50);

  }

  onChange(event: Event) {
    event.preventDefault;
   this.route.paramMap.subscribe((ruta: ParamMap) => {
     this.idusuario = parseInt(ruta.get('ruta')!);

     this.hab = {
       id: parseInt(this.formulario.value.id),
       nombre: this.formulario.value.nombre,
       imagen: this.formulario.value.imagen,
       porcentaje: this.formulario.value.porcentaje,
       usuario: { id: this.idusuario },
     };

    //  console.log('la habilidad número '+ JSON.stringify(this.Id) + ' fue editada');
     console.log(this.hab)
     this.habilidades.cambiarDato(this.hab).subscribe((data) => { });

      setTimeout(() => {
        this.habilidadesmodal=[{
          nombre: '',
          imagen: '',
          porcentaje: 50,
        }]
      }, 50);

    this.refresh(500);
   });
  }
}
