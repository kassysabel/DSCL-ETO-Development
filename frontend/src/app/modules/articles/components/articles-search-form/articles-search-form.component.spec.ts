import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesSearchFormComponent } from './articles-search-form.component';

describe('ArticlesSearchFormComponent', () => {
  let component: ArticlesSearchFormComponent;
  let fixture: ComponentFixture<ArticlesSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesSearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
