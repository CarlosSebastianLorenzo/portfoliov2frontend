import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { PaginaNoEncontradaComponent } from './componentes/pagina-no-encontrada/pagina-no-encontrada.component';
import { LoginComponent } from './componentes/login/login.component';



const routes: Routes = [
  {path: 'portfolio', component:PortfolioComponent},
  {path: 'portfolio/:id', component:PortfolioComponent},
  {path: 'acercade', component:PaginaNoEncontradaComponent},
  {path: '', redirectTo: 'portfolio', pathMatch: 'full'},
  {path: 'login', component:LoginComponent},
  {path: '**', redirectTo: 'pagina-no-encontrada', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
