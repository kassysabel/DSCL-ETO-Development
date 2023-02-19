import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ArticlesCreateComponent } from './articles-create/articles-create.component';
import { ArticlesUpdateComponent } from './articles-update/articles-update.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticlesListItemComponent } from './components/articles-list-item/articles-list-item.component';
import { ArticlesViewComponent } from './articles-view/articles-view.component';
import { ArticlesFormComponent } from './components/articles-form/articles-form.component';
import { ArticlesHeaderComponent } from './articles-header/articles-header.component';
import { ArticlesSearchFormComponent } from './components/articles-search-form/articles-search-form.component';

@NgModule({
  declarations: [
    ArticlesCreateComponent,
    ArticlesUpdateComponent,
    ArticlesListComponent,
    ArticlesListItemComponent,
    ArticlesViewComponent,
    ArticlesFormComponent,
    ArticlesHeaderComponent,
    ArticlesSearchFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [
    ArticlesCreateComponent,
    ArticlesUpdateComponent,
    ArticlesListComponent,
    ArticlesViewComponent,
    ArticlesHeaderComponent,
  ]
})
export class ArticlesModule { }
