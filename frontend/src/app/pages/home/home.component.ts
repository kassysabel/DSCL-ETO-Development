import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { ArticlesService } from '@lib/services/articles/articles.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements OnInit {
  private readonly _destroy$ = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticlesService
    ) {

    }

  innerPage = '';
  articleId = '';

  ngOnInit() {
  }

}
