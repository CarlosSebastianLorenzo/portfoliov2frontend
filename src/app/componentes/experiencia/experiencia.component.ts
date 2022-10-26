import { Component, OnInit } from '@angular/core';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Experiencias } from 'src/app/Modelos/experiencia.model';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  misexperiencias:any;
  public exp: Experiencias;
  experienciasmodal: any;
  idusuario: number = 0;
  protocolo: string = '';
  formulario:FormGroup;
  isLogged: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private experiencias: ExperienciaService,
              private route: ActivatedRoute,
              private autenticacionService:AutenticacionService) {
    this.exp ={
      id: 1,
      empresa : '',
      puesto : '',
      fechaInicio : new Date(2022,10,2),
      fechaFinal : new Date(2022,10,2),
      logo : '',
      actividades : '',
      usuario : { id : 1 }
    };
    this.formulario=this.formBuilder.group({
      id:[''],
      empresa:['',[Validators.required]],
      puesto:['',[Validators.required]],
      fechaInicio:[''],
      fechaFinal:[''],
      logo:[''],
      actividades: ['']
    })
   }

  ngOnInit(): void {
    this.experiencias.obtenerDatos().subscribe((data)=>{
      this.misexperiencias = data.experiencia;
    });
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
       this.experiencias.obtenerDatos().subscribe((data)=>{
        this.misexperiencias = data.experiencia;
      });
    }, milisegundos);
  }

  onDelete(id: number) {
    
    console.log('la experiencia número '+ JSON.stringify(id) + ' fue borrada');

    this.experiencias.borrarDato(id).subscribe((data) => {});

    this.refresh(500);
  }

  openModal(experiencias:Experiencias){
    this.experienciasmodal =[experiencias];
    setTimeout(() => {
      var myModal = new bootstrap.Modal(document.getElementById('experienciaModal'));
      myModal.show();
    }, 50);
  }  

  onChange(event: Event) {
    event.preventDefault;
    
    this.route.paramMap.subscribe((ruta: ParamMap) => {
      this.idusuario = parseInt(ruta.get('ruta')!);

      this.exp = {
      id: parseInt(this.formulario.value.id),
      empresa : this.formulario.value.empresa,
      puesto : this.formulario.value.puesto,
      fechaInicio : this.formulario.value.fechaInicio,
      fechaFinal : this.formulario.value.fechaFinal,
      logo : this.formulario.value.logo,
      actividades : this.formulario.value.actividades,
      usuario: { id: this.idusuario },
      };

      console.log('la experiencia número '+ this.exp.id + ' fue editada');

      this.experiencias.cambiarDato(this.exp).subscribe((data) => { });

      this.refresh(500);

    });
  }

  nuevaExperiencia(){
    this.experienciasmodal = [{
      empresa : '',
      puesto : '',
      fechaInicio : new Date(2022,10,2),
      fechaFinal : new Date(2022,10,2),
      logo : '',
      actividades : '',
    }]
    setTimeout(() => {
      var myModal = new bootstrap.Modal(document.getElementById('experienciaModal'));
      myModal.show();
    }, 50);

  }
}
