import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtigosPageRoutingModule } from './artigos-routing.module';

import { ArtigosPage } from './artigos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtigosPageRoutingModule
  ],
  declarations: [ArtigosPage]
})
export class ArtigosPageModule {}
