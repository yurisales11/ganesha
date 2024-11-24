import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanejamentosPageRoutingModule } from './planejamentos-routing.module';

import { PlanejamentosPage } from './planejamentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanejamentosPageRoutingModule
  ],
  declarations: [PlanejamentosPage]
})
export class PlanejamentosPageModule {}
