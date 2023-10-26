import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaDeTarefasPageRoutingModule } from './lista-de-tarefas-routing.module';

import { ListaDeTarefasPage } from './lista-de-tarefas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaDeTarefasPageRoutingModule
  ],
  declarations: [ListaDeTarefasPage]
})
export class ListaDeTarefasPageModule {}
