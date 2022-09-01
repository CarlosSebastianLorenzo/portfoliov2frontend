import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  modo:any;
  constructor() { }

  ngOnInit(): void {
  }
  darkmode(){
    if(this.modo=="dark"){
     this.modo="light"}
    else{ this.modo="dark"}
       
    
    console.log(this.modo)

  }
}
