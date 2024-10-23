import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtigosPage } from './artigos.page';

const routes: Routes = [
  {
    path: '',
    component: ArtigosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtigosPageRoutingModule {}
