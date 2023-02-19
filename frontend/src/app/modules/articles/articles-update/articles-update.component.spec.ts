import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesUpdateComponent } from './articles-update.component';

describe('ArticlesUpdateComponent', () => {
  let component: ArticlesUpdateComponent;
  let fixture: ComponentFixture<ArticlesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
