import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { ArticlesService } from '@lib/services/articles/articles.service';
import { CookieService } from '@lib/services/storage/cookie.service';
import { UsersService } from '@lib/services/users/users.service';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  private readonly _destroy$ = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private usersService: UsersService
    ) {

    }

  innerPage = '';
  articleId = '';
  userId = '';
  userInfo: any;
  ngOnInit() {
    this.innerPage = this.route.snapshot.paramMap.get('slug') || 'list';
    this.articleId = this.route.snapshot.paramMap.get('articleId') || '';
    this.innerPage = this.articleId != '' && this.innerPage == 'list' ? 'view' : this.innerPage;
    this.userId = this.cookieService.get('userToken') || '';
    this.usersService
      .getUser(this.userId)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.userInfo = data;
        },
        error: (error) => {
            window.location.href = `${environment.SITE_URL}`;
        },
      });
  }

}
