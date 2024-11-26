import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarreceitasPage } from './adicionarreceitas.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarreceitasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdicionarreceitasPageRoutingModule {}
