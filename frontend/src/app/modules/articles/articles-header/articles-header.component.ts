import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-articles-header',
  templateUrl: './articles-header.component.html',
  styleUrls: ['./articles-header.component.scss']
})
export class ArticlesHeaderComponent  implements OnInit {
  private readonly _destroy$ = new Subject<boolean>();
  @Input() userDetails = {
    username: '',
  };
  constructor( ) { }
  ngOnInit() { }

}
