import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesHeaderComponent } from './articles-header.component';

describe('ArticlesHeaderComponent', () => {
  let component: ArticlesHeaderComponent;
  let fixture: ComponentFixture<ArticlesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
