import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { IArticle } from '@lib/services/articles/articles-interface';
import { ArticlesService } from '@lib/services/articles/articles.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-articles-view',
  templateUrl: './articles-view.component.html',
  styleUrls: ['./articles-view.component.scss']
})
export class ArticlesViewComponent  implements OnInit {
  private readonly _destroy$ = new Subject<boolean>();

  @Input() articleId: string = '';
  constructor(
    private articleService: ArticlesService
    ) {}

  error = {
    status :false,
    msg: ''
  };
  article: IArticle =  {
    id: '',
    title: '',
    body: '',
  };
  articlesLink = `${environment.SITE_URL}/articles`;
  updateArticleLink = `${environment.SITE_URL}/articles/update/`;
  ngOnInit() {
    this.viewArticle(this.articleId)
  }

  viewArticle(articleId = '') {
    console.log('data-articleId',articleId);
    if(articleId == '') {
      this.error = {
        status: true,
        msg: 'Not Found'
      };
      return;
    }
    this.articleService.getArticle(articleId)
    .pipe(takeUntil(this._destroy$)).subscribe({
      next: (data) => {
        this.article = data;
        console.log('data-viewArticle',data);
      },
      error: (err) => {
        console.log('err',err);
        // this.changeDetector.detectChanges();
      }
    })


  }
}
