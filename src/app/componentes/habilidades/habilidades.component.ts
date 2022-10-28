import { Component, OnInit } from '@angular/core';
import { HabilidadesService } from 'src/app/servicios/habilidades.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Habilidades } from '../../Modelos/habilidades.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { HabilidadesBlandasService } from 'src/app/servicios/habilidades-blandas.service';
declare var bootstrap: any;

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css'],
})
export class HabilidadesComponent implements OnInit {
  mishabilidades: any;
  mishabilidadesBlandas: any;
  habilidadesmodal: any;
  public hab: Habilidades;
  idusuario: number = 0;
  protocolo: string = '';
  formulario:FormGroup;
  isLogged: boolean = false;
  

  constructor(private formBuilder: FormBuilder,
              private habilidades: HabilidadesService,
              private route: ActivatedRoute,
              private autenticacionService:AutenticacionService,
              private habilidadesBlandas: HabilidadesBlandasService) {
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

    this.habilidadesBlandas.obtenerDatos().subscribe((data) => {
    this.mishabilidadesBlandas = data.habilidadesBlandas;
    });

    this.habilidadesmodal=[{
      nombre: '',
      imagen: '',
      porcentaje: 50,
    }]
    //Verifica si la ruta coincide con el usuario logueado y muestra los botones
    this.route.paramMap.subscribe((ruta: ParamMap) => {
     this.idusuario = parseInt(ruta.get('ruta')!);
    var currentUser=this.autenticacionService.UsuarioAutenticado;
    if (currentUser && currentUser.id==this.idusuario){
      this.isLogged=true;
    }
  });
  }

  refresh(milisegundos:number) {
         setTimeout(() => {

          this.habilidades.obtenerDatos().subscribe((data) => {
            this.mishabilidades = data.habilidades;
            });

          this.habilidadesBlandas.obtenerDatos().subscribe((data) => {
            this.mishabilidadesBlandas = data.habilidadesBlandas;
            });
            
         }, milisegundos);
  }

  onDelete(id: number) {

    this.habilidades.borrarDato(id).subscribe((data) => {});
  
    this.refresh(50);
  }

  onDeleteBlandas(id: number) {

    this.habilidadesBlandas.borrarDato(id).subscribe((data) => {});
  
    this.refresh(50);
  }

  openModal(habilidades:Habilidades){
    this.habilidadesmodal =[habilidades];
    setTimeout(() => {
      var myModal = new bootstrap.Modal(document.getElementById('HabilidadesModal'));
      myModal.show();
    }, 50);
  }

  openModalBlandas(habilidades:Habilidades){
    this.habilidadesmodal =[habilidades];
    setTimeout(() => {
      var myModal = new bootstrap.Modal(document.getElementById('HabilidadesBlandasModal'));
      myModal.show();
    }, 50);
  }

  nuevaHabilidad(){
    this.habilidadesmodal = [{
      nombre: '',
      imagen: '',
      porcentaje: 50
    }]
    setTimeout(() => {
      var myModal = new bootstrap.Modal(document.getElementById('HabilidadesModal'));
      myModal.show();
    }, 50);
  }

  nuevaHabilidadBlanda(){
    this.habilidadesmodal = [{
      nombre: '',
      imagen: '',
      porcentaje: 50
    }]
    setTimeout(() => {
      var myModal = new bootstrap.Modal(document.getElementById('HabilidadesBlandasModal'));
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

    this.refresh(500);
   });
  }

  onChangeBlandas(event: Event) {
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
     this.habilidadesBlandas.cambiarDato(this.hab).subscribe((data) => { });

    this.refresh(500);
   });
  }

}
