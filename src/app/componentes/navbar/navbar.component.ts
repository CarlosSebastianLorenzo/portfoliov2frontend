import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ruta: string;
  idusuario: number;
  isLogged: boolean = false;
  constructor(private router : Router,
              private route : ActivatedRoute,
              private autenticacionService : AutenticacionService) {
    this.ruta = "#";
    this.idusuario = 0;
   }

  ngOnInit(): void {
    //this.ruta = this.router.url;
    this.route.paramMap.subscribe((rut: ParamMap) => {
      this.idusuario = parseInt(rut.get('ruta')!);
      this.ruta = "portfolio/"+this.idusuario;
    });
    var currentUser=this.autenticacionService.UsuarioAutenticado;
    if(currentUser&& currentUser.accessToken){
      this.isLogged = true;
    }
  }

  logOut(): void{
    window.sessionStorage.clear();
    this.isLogged = false;
    window.location.reload();
  }

}
