import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarplanejamentosPage } from './adicionarplanejamentos.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarplanejamentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdicionarplanejamentosPageRoutingModule {}
