import { Component, OnInit } from '@angular/core';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Proyectos } from 'src/app/Modelos/proyectos.model';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  misproyectos:any;
  public pro: Proyectos;
  proyectosmodal: any;
  idusuario: number = 0;
  protocolo: string = '';
  formulario:FormGroup;
  isLogged: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private proyectos: ProyectosService,
    private route: ActivatedRoute,
    private autenticacionService:AutenticacionService) {
      this.pro ={
        id: 1,
        nombre : '',
        fecha : new Date(2022,10,2),
        descripcion : '',
        link : '',
        imagen : '',
        usuario : { id : 1 }
      };
      this.formulario=this.formBuilder.group({
        id:[''],
        nombre:['',[Validators.required]],
        fecha:[''],
        descripcion:[''],
        link: [''],
        imagen: ['']
      })
     }

  ngOnInit(): void {
    this.proyectos.obtenerDatos().subscribe((data)=>{
      this.misproyectos = data.proyectos;
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
       this.proyectos.obtenerDatos().subscribe((data)=>{
        this.misproyectos = data.proyectos;
      });
    }, milisegundos);
  }

  onDelete(id: number) {
    
    console.log('el proyecto número '+ JSON.stringify(id) + ' fue borrado');

    this.proyectos.borrarDato(id).subscribe((data) => {});

    this.refresh(500);
  }

  openModal(proyectos:Proyectos){
    this.proyectosmodal =[proyectos];
    setTimeout(() => {
      var myModal = new bootstrap.Modal(document.getElementById('proyectosModal'));
      myModal.show();
    }, 50);
  }  

  onChange(event: Event) {
    event.preventDefault;
    
    this.route.paramMap.subscribe((ruta: ParamMap) => {
      this.idusuario = parseInt(ruta.get('ruta')!);

      this.pro = {
      id: parseInt(this.formulario.value.id),
      nombre : this.formulario.value.nombre,
      fecha : this.formulario.value.fecha,
      descripcion : this.formulario.value.descripcion,
      link : this.formulario.value.link,
      imagen : this.formulario.value.imagen,
      usuario: { id: this.idusuario },
      };

      console.log('el proyecto número '+ this.pro.id + ' fue editado');

      this.proyectos.cambiarDato(this.pro).subscribe((data) => { });

      this.refresh(500);

    });
  }

  nuevoProyecto(){
    this.proyectosmodal = [{
      nombre : '',
      fecha : new Date(2022,10,2),
      descripcion : '',
      link : '',
      imagen : '',
    }]
    setTimeout(() => {
      var myModal = new bootstrap.Modal(document.getElementById('proyectosModal'));
      myModal.show();
    }, 50);

  }

  goToLink(url: string){
    window.open(url, "_blank");
  }
}
