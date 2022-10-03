import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  modo:any;
  cambiar:any;
  constructor() { }
  
  ngOnInit(): void {
    this.modo="dark";
    this.cambiar="light";
  }
  darkmode(){
    if(this.modo=="dark"){
     this.modo="light",this.cambiar="dark";}
    else{ this.modo="dark",this.cambiar="light";}
       
    
    console.log(this.modo)

  }
}
