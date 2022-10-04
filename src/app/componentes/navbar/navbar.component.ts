import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ruta: string;
  idusuario: number;
  constructor(private router : Router, private route : ActivatedRoute) {
    this.ruta = "#";
    this.idusuario = 0;
   }

  ngOnInit(): void {
    //this.ruta = this.router.url;
    this.route.paramMap.subscribe((rut: ParamMap) => {
      this.idusuario = parseInt(rut.get('ruta')!);
      this.ruta = "portfolio/"+this.idusuario;
  });

}
}
