import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { IArticle } from '@lib/services/articles/articles-interface';
import { ArticlesService } from '@lib/services/articles/articles.service';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-articles-update',
  templateUrl: './articles-update.component.html',
  styleUrls: ['./articles-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesUpdateComponent implements OnInit {
  private readonly _destroy$ = new Subject<boolean>();

  @Input() articleId: string = '';
  articleDetails: IArticle | any;
  constructor(
    private articleService: ArticlesService,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  error = {
    status :false,
    msg: ''
  };

  articlesLink = `${environment.SITE_URL}/articles`;
  viewArticlesLink = `${environment.SITE_URL}/article/`;
  ngOnInit() {
    this.updateArticle(this.articleId);
  }

  updateArticle(articleId = '') {
    console.log('data-articleId',articleId);
    if(articleId == '') {
      this.error = {
        status: true,
        msg: 'Not Found'
      };
      return;
    }
    this.articleService
      .getArticle(articleId)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (data) => {
          console.log('data-updateArticle',data);
          this.articleDetails = data;
          this.changeDetector.detectChanges();
        },
        error: (err) => {
          console.log('err',err);
          this.changeDetector.detectChanges();
        }
      })


  }
}
