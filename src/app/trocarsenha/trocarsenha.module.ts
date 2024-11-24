import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrocarsenhaPageRoutingModule } from './trocarsenha-routing.module';

import { TrocarsenhaPage } from './trocarsenha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrocarsenhaPageRoutingModule
  ],
  declarations: [TrocarsenhaPage]
})
export class TrocarsenhaPageModule {}
