import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrocarsenhaPage } from './trocarsenha.page';

const routes: Routes = [
  {
    path: '',
    component: TrocarsenhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrocarsenhaPageRoutingModule {}
