import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesDatepickerComponent } from './articles-datepicker.component';

describe('ArticlesDatepickerComponent', () => {
  let component: ArticlesDatepickerComponent;
  let fixture: ComponentFixture<ArticlesDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesDatepickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
