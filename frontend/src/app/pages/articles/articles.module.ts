import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesModule } from '@modules/articles/articles.module';
import { ArticlesComponent } from './articles.component';

const routes: Routes = [{ path: '', component: ArticlesComponent }];

@NgModule({
  declarations: [ArticlesComponent],
  imports: [RouterModule.forChild(routes), CommonModule, ArticlesModule], //
  exports: [RouterModule],
})
export class ArticlesPageModule {}
