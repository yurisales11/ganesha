import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarreceitasPageRoutingModule } from './adicionarreceitas-routing.module';

import { AdicionarreceitasPage } from './adicionarreceitas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarreceitasPageRoutingModule
  ],
  declarations: [AdicionarreceitasPage]
})
export class AdicionarreceitasPageModule {}
