import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaDeTarefasPage } from './lista-de-tarefas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaDeTarefasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaDeTarefasPageRoutingModule {}
