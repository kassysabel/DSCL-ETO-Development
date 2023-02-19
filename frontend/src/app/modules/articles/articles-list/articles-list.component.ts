import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { IArticle } from '@lib/services/articles/articles-interface';
import { ArticlesService } from '@lib/services/articles/articles.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent  implements OnInit {
  private readonly _destroy$ = new Subject<boolean>();

  constructor(
    private articleService: ArticlesService,
    private readonly changeDetector: ChangeDetectorRef
    ) {
    }
  articles :IArticle[] = [];
  articlesDefault :IArticle[] = [];
  addArticleLink = `${environment.SITE_URL}/articles/add`;
  ngOnInit() {
    this.getArticles();
  }
  getArticles() {
    this.articleService
    .getArticles()
    .pipe(takeUntil(this._destroy$))
    .subscribe((data) => {
        console.log(data);
        this.articlesDefault = data.map(article => {
          let fd = new Date(article.date);
          return {
            ...article,
            formatDate: fd.toDateString()
          }
        });
        this.articles = [...this.articlesDefault];
        this.changeDetector.detectChanges();

        // console.log('this.articles', this.articles);
        // this.searchArticle('title', 'test');
        // console.log('this.articles', this.articles);
    });
  }
  onSearchFilters(e: {category: string; searchword: string }){
    this.onResetFilters({})
    this.searchArticle(e.category, e.searchword)
  }
  searchArticle(category = '', keyword = '') {
    //id, userId, title, body
    this.articles = this.articles.filter((item, index, arr) => {
          let ic = item[category] || '';
          return ic.toLocaleLowerCase().includes(keyword.toLocaleLowerCase());
    });
    this.changeDetector.detectChanges();
  }

  onResetFilters(e:{}) {
    this.articles = [...this.articlesDefault];
    console.log(e)
    this.changeDetector.detectChanges();
  }
}
