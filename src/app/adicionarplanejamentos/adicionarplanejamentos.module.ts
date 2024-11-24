import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarplanejamentosPageRoutingModule } from './adicionarplanejamentos-routing.module';

import { AdicionarplanejamentosPage } from './adicionarplanejamentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarplanejamentosPageRoutingModule
  ],
  declarations: [AdicionarplanejamentosPage]
})
export class AdicionarplanejamentosPageModule {}
