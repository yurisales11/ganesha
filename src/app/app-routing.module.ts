import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'artigos',
    loadChildren: () => import('./artigos/artigos.module').then( m => m.ArtigosPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'conta',
    loadChildren: () => import('./conta/conta.module').then( m => m.ContaPageModule)
  },
  {
    path: 'adicionarcontas',
    loadChildren: () => import('./adicionarcontas/adicionarcontas.module').then( m => m.AdicionarcontasPageModule)
  },
  {
    path: 'planejamentos',
    loadChildren: () => import('./planejamentos/planejamentos.module').then( m => m.PlanejamentosPageModule)
  },
  {
    path: 'adicionarplanejamentos',
    loadChildren: () => import('./adicionarplanejamentos/adicionarplanejamentos.module').then( m => m.AdicionarplanejamentosPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
   
  
    path: 'trocarsenha',
    loadChildren: () => import('./trocarsenha/trocarsenha.module').then( m => m.TrocarsenhaPageModule)
  },
  {
    path: 'teste',
    loadChildren: () => import('./teste/teste.module').then( m => m.TestePageModule)
  },
  {
    path: 'receitas',
    loadChildren: () => import('./receitas/receitas.module').then( m => m.ReceitasPageModule)
  },
  {
    path: 'adicionarreceitas',
    loadChildren: () => import('./adicionarreceitas/adicionarreceitas.module').then( m => m.AdicionarreceitasPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
