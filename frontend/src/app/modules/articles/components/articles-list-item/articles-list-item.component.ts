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
  constructor( ) { }
  ngOnInit() { }

  trackById(idx: number, data: { id: string }) {
    return data.id;
  }
}
