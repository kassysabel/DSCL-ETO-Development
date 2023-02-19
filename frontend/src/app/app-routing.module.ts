import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { AuthGuard } from '@core/guards/auth.guard';
export const appRoutes: Routes = [

  // { path: 'welcome', redirectTo: '', pathMatch: 'full' },

  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'articles',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/articles/articles.module').then((m) => m.ArticlesPageModule),
  },
  {
    path: 'article/:articleId',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/articles/articles.module').then((m) => m.ArticlesPageModule),
  },
  {
    path: 'articles/:slug',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/articles/articles.module').then((m) => m.ArticlesPageModule),
  },
  {
    path: 'articles/:slug/:articleId',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/articles/articles.module').then((m) => m.ArticlesPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
