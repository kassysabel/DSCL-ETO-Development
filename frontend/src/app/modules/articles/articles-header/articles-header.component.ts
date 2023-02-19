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
    email: '',
  };
  colors = [
    'green', 'orange', 'red', 'blue', 'teal', 'cyan', 'pink', 'fuchsia'
  ];
  bgcolors = '';
  constructor( ) { }
  ngOnInit() {
    this.bgcolors = 'bg-'+this.colors[Math.floor(Math.random()*this.colors.length)]+'-300';
  }

}
