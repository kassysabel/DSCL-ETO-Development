import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { CookieService } from '@lib/services/storage/cookie.service';

@Component({
  selector: 'app-articles-create',
  templateUrl: './articles-create.component.html',
  styleUrls: ['./articles-create.component.scss']
})
export class ArticlesCreateComponent implements OnInit {
  userId: any = '';

  constructor(
    private cookieService: CookieService
    ) {}

    articlesLink = `${environment.SITE_URL}/articles`;
  ngOnInit() {
    this.userId = this.cookieService.get('userToken');
  }

}
