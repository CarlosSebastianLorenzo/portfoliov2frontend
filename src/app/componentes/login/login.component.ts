import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario:FormGroup;
  
  constructor(private formBuilder: FormBuilder, private autenticacionService:AutenticacionService, private ruta:Router) { 
    this.formulario=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      contrasenia:['',[Validators.required,Validators.minLength(8)]]
    })
  }
  ngOnInit(): void {
    console.log(this.formulario)
  }

  get Email(){
    return this.formulario.get('email');
  }

  get Contrasenia(){
    return this.formulario.get('contrasenia');
  }

  onEnviar(event: Event){
    event.preventDefault;
    this.autenticacionService.IniciarSesion(this.formulario.value).subscribe(data=>{
      console.log(data.id);
      this.ruta.navigate(['/portfolio/'+data.id]);
    });
  }

  onRegister(event: Event){
    event.preventDefault;

    this.autenticacionService.Registrarse(this.formulario.value).subscribe(data=>{
      // console.log(JSON.stringify(data));
      alert(JSON.stringify(data));
    });

  }

}
