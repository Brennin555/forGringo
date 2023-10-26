import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConversaoMoedasPageRoutingModule } from './conversao-moedas-routing.module';

import { ConversaoMoedasPage } from './conversao-moedas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConversaoMoedasPageRoutingModule
  ],
  declarations: [ConversaoMoedasPage]
})
export class ConversaoMoedasPageModule {}
