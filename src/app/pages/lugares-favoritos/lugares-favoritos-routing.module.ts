import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LugaresFavoritosPage } from './lugares-favoritos.page';

const routes: Routes = [
  {
    path: '',
    component: LugaresFavoritosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LugaresFavoritosPageRoutingModule {}
