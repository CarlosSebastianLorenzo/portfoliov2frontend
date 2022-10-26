import { Component, OnInit } from '@angular/core';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Educacion } from 'src/app/Modelos/educacion.model';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  mieducacion:any;
  public edu: Educacion;
  educacionmodal: any;
  idusuario: number = 0;
  protocolo: string = '';
  formulario:FormGroup;
  isLogged: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private educacion: EducacionService,
    private route: ActivatedRoute,
    private autenticacionService:AutenticacionService) {
      this.edu ={
        id: 1,
        institucion : '',
        logo : '',
        titulo : '',
        fechaInicial : new Date(2022,10,2),
        fechaFinal : new Date(2022,10,2),
        usuario : { id : 1 }
      };
      this.formulario=this.formBuilder.group({
        id:[''],
        institucion:['',[Validators.required]],
        logo:['',[Validators.required]],
        titulo:['',[Validators.required]],
        fechaInicial:[''],
        fechaFinal:['']
      })
     }

  ngOnInit(): void {
    this.educacion.obtenerDatos().subscribe((data)=>{
      this.mieducacion = data.educacion;
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
       this.educacion.obtenerDatos().subscribe((data)=>{
        this.mieducacion = data.educacion;
      });
    }, milisegundos);
  }

  onDelete(id: number) {
    
    console.log('la educación número '+ JSON.stringify(id) + ' fue borrada');

    this.educacion.borrarDato(id).subscribe((data) => {});

    this.refresh(500);
  }

  openModal(educacion:Educacion){
    this.educacionmodal =[educacion];
    setTimeout(() => {
      var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
      myModal.show();
    }, 50);
  } 
  
  onChange(event: Event) {
    event.preventDefault;
    
    this.route.paramMap.subscribe((ruta: ParamMap) => {
      this.idusuario = parseInt(ruta.get('ruta')!);

      this.edu = {
      id: parseInt(this.formulario.value.id),
      institucion : this.formulario.value.institucion,
      logo : this.formulario.value.logo,
      titulo : this.formulario.value.titulo,
      fechaInicial : this.formulario.value.fechaInicial,
      fechaFinal : this.formulario.value.fechaFinal,
      usuario: { id: this.idusuario },
      };

      console.log('la educación número '+ this.edu.id + ' fue editada');

      this.educacion.cambiarDato(this.edu).subscribe((data) => { });

      this.refresh(500);

    });
  }

  nuevaEducacion(){
    this.educacionmodal = [{
      institucion : '',
      logo : '',
      titulo : '',
      fechaInicial : new Date(2022,10,2),
      fechaFinal : new Date(2022,10,2),
    }]
    setTimeout(() => {
      var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
      myModal.show();
    }, 50);

  }
}
