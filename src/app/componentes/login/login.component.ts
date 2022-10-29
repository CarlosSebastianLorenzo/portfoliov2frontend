import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import {environment} from 'src/environments/environment';
declare var bootstrap: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario:FormGroup;
  mensaje: string;
  portfolioSebastian: string;
  
  constructor(private formBuilder: FormBuilder,
              private autenticacionService:AutenticacionService,
              private ruta:Router) { 

    this.formulario=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      contrasenia:['',[Validators.required,Validators.minLength(8)]]
    });

    this.portfolioSebastian = "/portfolio/1";

    this.mensaje = '';
  }
  ngOnInit(): void {
  }

  get Email(){
    return this.formulario.get('email');
  }

  get Contrasenia(){
    return this.formulario.get('contrasenia');
  }

  onEnviar(event: Event){
    event.preventDefault;
    this.autenticacionService.IniciarSesion(this.formulario.value).subscribe({
      next: data=>{
      this.ruta.navigate(['/portfolio/'+data.id]);
      },
      error: (error:HttpErrorResponse)=>{
        this.mensaje = "Contraseña o Usuario incorrecto";
        var myModal = new bootstrap.Modal(document.getElementById('usuariocreadoModal'));
        myModal.show();
      }

    });
  }

  onRegister(event: Event){
    event.preventDefault;

    this.autenticacionService.Registrarse(this.formulario.value).subscribe({
      next: (response: String) => {
        this.mensaje = "el usuario fue creado correctamente";
        var myModal = new bootstrap.Modal(document.getElementById('usuariocreadoModal'));
        myModal.show();
      },
      error: (error:HttpErrorResponse) =>{
         if(error.status==400){
          this.mensaje = "el usuario ya existe o hubo algún otro error";
          var myModal = new bootstrap.Modal(document.getElementById('usuariocreadoModal'));
          myModal.show();
        }
      }
    });
  }

  goToLink(){
    window.open(this.portfolioSebastian, "_blank");
  }

}
