import { Component, OnInit } from '@angular/core';
import {RedesSocialesService} from 'src/app/servicios/redes-sociales.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RedesSociales } from 'src/app/Modelos/redes-sociales.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from '../../servicios/autenticacion.service';
declare var bootstrap: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
misredes:any;
redesmodal:any;
public red: RedesSociales;
idusuario: number = 0;
formulario:FormGroup;
isLogged: boolean = false;
isHidden: number = 0;

  constructor(private formBuilder: FormBuilder,
              private redesSociales : RedesSocialesService,
              private route: ActivatedRoute,
              private autenticacionService:AutenticacionService) {
   this.red = {
    id: 1,
      logo: '',
      link: '',
      nombre: '',
      usuario: { id: 1 },
   }; 
   this.formulario=this.formBuilder.group({
    id:[''],
    logo:['',[Validators.required]],
    link:[''],
    nombre: ['']
  });
  }

  ngOnInit(): void {
    this.redesSociales.obtenerDatos().subscribe((data) => {
      this.misredes = data.redessociales;
    });

    this.redesmodal=[{
      logo: '',
      link: '',
      nombre: '',
    }];
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

      this.redesSociales.obtenerDatos().subscribe((data) => {
       this.misredes = data.redessociales;
      });

    }, milisegundos);
  }
  
  onDelete(id: number) {

    this.redesSociales.borrarDato(id).subscribe((data) => {});
  
    this.refresh(50);
  }

  openModal(redes:RedesSociales){
    this.redesmodal =[redes];
    setTimeout(() => {
      var myModal = new bootstrap.Modal(document.getElementById('RedesModal'));
      myModal.show();
    }, 50);
  }

  nuevaRedSocial(){
    this.redesmodal = [{
      logo: '',
      link: '',
      nombre: ''
    }]
    setTimeout(() => {
      var myModal = new bootstrap.Modal(document.getElementById('RedesModal'));
      myModal.show();
    }, 50);
  }

  onChange(event: Event) {
    event.preventDefault;
   this.route.paramMap.subscribe((ruta: ParamMap) => {
     this.idusuario = parseInt(ruta.get('ruta')!);

     this.red = {
       id: parseInt(this.formulario.value.id),
       logo: this.formulario.value.logo,
       link: this.formulario.value.link,
       nombre: this.formulario.value.nombre,
       usuario: { id: this.idusuario },
     };

     console.log(this.red);

     this.redesSociales.cambiarDato(this.red).subscribe((data) => { });

    this.refresh(500);
   });
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }
}
