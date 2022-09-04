import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario:FormGroup;
  constructor(private formBuilder: FormBuilder) { 
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

}
