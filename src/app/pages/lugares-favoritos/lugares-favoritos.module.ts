import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LugaresFavoritosPageRoutingModule } from './lugares-favoritos-routing.module';

import { LugaresFavoritosPage } from './lugares-favoritos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LugaresFavoritosPageRoutingModule
  ],
  declarations: [LugaresFavoritosPage]
})
export class LugaresFavoritosPageModule {}
