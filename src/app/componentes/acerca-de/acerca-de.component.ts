import { Component, OnInit } from '@angular/core';
import { AcercaDeService } from 'src/app/servicios/acerca-de.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AcercaDe } from 'src/app/Modelos/acerca-de.model';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  miacercade:any;
  public acde: AcercaDe;
  acercademodal: any;
  idusuario: number = 0;
  formulario:FormGroup;
  isLogged: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private acercaDe: AcercaDeService,
    private route: ActivatedRoute,
    private autenticacionService:AutenticacionService) {
      this.acde ={
        id: 1,
        nombre : '',
        color : '',
        titulo : '',
        fotoPerfil : '',
        fotoPortada : '',
        info : '',
        usuario : { id : 1 }
      };
      this.formulario=this.formBuilder.group({
        id:[''],
        nombre:['',[Validators.required]],
        color:[''],
        titulo:[''],
        fotoPerfil:[''],
        fotoPortada:[''],
        info: ['']
      })
     }

  ngOnInit(): void {
    this.acercaDe.obtenerDatos().subscribe((data)=>{
      if(data.acercade[0]!=null){
        this.miacercade = data.acercade[0];

      document.documentElement.style.setProperty('--color-primario', this.miacercade.color);
      }
      else{
        this.miacercade = {
          nombre: "Tu Nombre",
          titulo: "Tu Título",
          fotoPerfil: "https://cdn-icons-png.flaticon.com/512/20/20079.png",
          fotoPortada: "https://www.ionos.es/digitalguide/fileadmin/DigitalGuide/Teaser/web-development-t.jpg",
          info: "Breve resumen sobre ti y lo que ofreces"
        };
      }
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
       this.acercaDe.obtenerDatos().subscribe((data)=>{
        this.miacercade = data.acercade[0];
      });
    }, milisegundos);
  }

  openModal(acercaDe:AcercaDe){
    this.acercademodal =[acercaDe];
    setTimeout(() => {
      var myModal = new bootstrap.Modal(document.getElementById('acercadeModal'));
      myModal.show();
    }, 50);
  }  

  onChange(event: Event) {
    event.preventDefault;
    
    this.route.paramMap.subscribe((ruta: ParamMap) => {
      this.idusuario = parseInt(ruta.get('ruta')!);

      this.acde = {
      id: parseInt(this.formulario.value.id),
      nombre : this.formulario.value.nombre,
      color : this.formulario.value.color,
      titulo : this.formulario.value.titulo,
      fotoPerfil : this.formulario.value.fotoPerfil,
      fotoPortada : this.formulario.value.fotoPortada,
      info : this.formulario.value.info,
      usuario: { id: this.idusuario },
      };

      console.log('Acerca De ha sido editado');

      this.acercaDe.cambiarDato(this.acde).subscribe((data) => { });
      
      document.documentElement.style.setProperty('--color-primario', this.formulario.value.color);

      this.refresh(500);

    });
  }

}
