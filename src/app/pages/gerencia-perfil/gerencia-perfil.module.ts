import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GerenciaPerfilPageRoutingModule } from './gerencia-perfil-routing.module';

import { GerenciaPerfilPage } from './gerencia-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GerenciaPerfilPageRoutingModule
  ],
  declarations: [GerenciaPerfilPage]
})
export class GerenciaPerfilPageModule {}
