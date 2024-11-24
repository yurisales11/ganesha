import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarcontasPageRoutingModule } from './adicionarcontas-routing.module';

import { AdicionarcontasPage } from './adicionarcontas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarcontasPageRoutingModule
  ],
  declarations: [AdicionarcontasPage]
})
export class AdicionarcontasPageModule {}
