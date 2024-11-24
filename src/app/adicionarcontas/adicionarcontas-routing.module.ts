import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarcontasPage } from './adicionarcontas.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarcontasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdicionarcontasPageRoutingModule {}
