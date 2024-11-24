import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanejamentosPage } from './planejamentos.page';

const routes: Routes = [
  {
    path: '',
    component: PlanejamentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanejamentosPageRoutingModule {}
