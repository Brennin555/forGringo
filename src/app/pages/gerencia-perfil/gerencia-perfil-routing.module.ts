import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GerenciaPerfilPage } from './gerencia-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: GerenciaPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GerenciaPerfilPageRoutingModule {}
