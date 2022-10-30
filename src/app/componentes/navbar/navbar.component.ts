import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortfolioComponent } from '../portfolio/portfolio.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ruta: string;
  idusuario: number;
  isLogged: boolean = false;
  dark: boolean = false;
  constructor(private router : Router,
              private portfolio : PortfolioComponent,
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
    };
    if(this.portfolio.modo=="dark"){
      this.dark = true;
    }
    else{
      this.dark = false;
    };
  }

  logOut(): void{
    window.sessionStorage.clear();
    this.isLogged = false;
    window.location.reload();
  }

  goToLink(){
    window.open("https://www.argentina.gob.ar/economia/conocimiento/argentina-programa", "_blank");
  }

  darkmode(){
    if(this.portfolio.modo=="dark"){
      this.portfolio.modo="light";
      this.dark = false;
    }
    else{
      this.portfolio.modo="dark";
      this.dark = true;};
      localStorage.setItem('modo',this.portfolio.modo);
  }

}
