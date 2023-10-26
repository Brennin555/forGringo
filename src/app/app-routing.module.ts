import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'conversao-moedas',
    loadChildren: () => import('./pages/conversao-moedas/conversao-moedas.module').then( m => m.ConversaoMoedasPageModule)
  },
  {
    path: 'lugares-favoritos',
    loadChildren: () => import('./pages/lugares-favoritos/lugares-favoritos.module').then( m => m.LugaresFavoritosPageModule)
  },
  {
    path: 'lista-de-tarefas',
    loadChildren: () => import('./pages/lista-de-tarefas/lista-de-tarefas.module').then( m => m.ListaDeTarefasPageModule)
  },
  {
    path: 'estadia',
    loadChildren: () => import('./pages/estadia/estadia.module').then( m => m.EstadiaPageModule)
  },
  {
    path: 'gerencia-perfil',
    loadChildren: () => import('./pages/gerencia-perfil/gerencia-perfil.module').then( m => m.GerenciaPerfilPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
