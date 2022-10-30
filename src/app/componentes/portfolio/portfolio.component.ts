import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  modo:any;
  constructor() {
   }
  
  ngOnInit(): void {
    if(localStorage.getItem('modo')==null){
      this.modo = "dark";
    }
    else{
      this.modo=localStorage.getItem('modo');
    }
  }

}
