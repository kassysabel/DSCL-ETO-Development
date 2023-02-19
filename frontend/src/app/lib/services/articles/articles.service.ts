import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IArticle } from "@lib/services/articles/articles-interface";
import { environment } from '@environments/environment';

const ARTICLES_ENDPOINT = `${environment.API}/articles`

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(
    private http:HttpClient
  ) { }

  getArticles() {
    return  this.http.get<IArticle[]>(`${ARTICLES_ENDPOINT}`);
  }

  getArticle(articleId : string) {
    return this.http.get<IArticle>(`${ARTICLES_ENDPOINT}/${articleId}`);
  }

  createArticle(userId: string, title: string, body: string ) {
    return this.http.post(`${ARTICLES_ENDPOINT}`,{ userId, title, body });
  }

  updateArticle(articleId: string, params: object) {
    return this.http.put(`${ARTICLES_ENDPOINT}/${articleId}`,{ ...params });
  }
}
