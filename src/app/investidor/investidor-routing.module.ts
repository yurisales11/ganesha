import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestidorPage } from './investidor.page';

const routes: Routes = [
  {
    path: '',
    component: InvestidorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestidorPageRoutingModule {}
