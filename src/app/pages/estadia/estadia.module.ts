import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadiaPageRoutingModule } from './estadia-routing.module';

import { EstadiaPage } from './estadia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadiaPageRoutingModule
  ],
  declarations: [EstadiaPage]
})
export class EstadiaPageModule {}
