import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvestidorPageRoutingModule } from './investidor-routing.module';

import { InvestidorPage } from './investidor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvestidorPageRoutingModule
  ],
  declarations: [InvestidorPage]
})
export class InvestidorPageModule {}
