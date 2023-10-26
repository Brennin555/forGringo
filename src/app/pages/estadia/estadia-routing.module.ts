import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadiaPage } from './estadia.page';

const routes: Routes = [
  {
    path: '',
    component: EstadiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadiaPageRoutingModule {}
