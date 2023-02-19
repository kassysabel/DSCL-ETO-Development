import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { IArticle } from '@lib/services/articles/articles-interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-articles-list-item',
  templateUrl: './articles-list-item.component.html',
  styleUrls: ['./articles-list-item.component.scss']
})
export class ArticlesListItemComponent implements OnInit {
  private readonly _destroy$ = new Subject<boolean>();
  @Input() articles: IArticle[] = [];

  updateArticleLink = `${environment.SITE_URL}/articles/update/`;
  constructor(
    // private articleService: ArticlesService
    ) {
    }

  ngOnInit() {
    // this.articles = this.articles.map(article => {
    //   let fd = article.date?.toISOString();
    //   return {
    //     ...article,
    //     formatDate: fd
    //   }
    // });
    // console.log('this.articles', this.articles);
  }

  trackById(idx: number, data: { id: string }) {
    return data.id;
  }
}
