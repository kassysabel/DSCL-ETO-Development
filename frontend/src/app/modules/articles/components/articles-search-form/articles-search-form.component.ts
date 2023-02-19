import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticlesService } from '@lib/services/articles/articles.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-articles-search-form',
  templateUrl: './articles-search-form.component.html',
  styleUrls: ['./articles-search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesSearchFormComponent  implements OnInit  { //AfterViewInit,
  private readonly _destroy$ = new Subject<boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private readonly changeDetector: ChangeDetectorRef,
    private articleService: ArticlesService,
  ) {}
  // @Input() articleItems:any = null ;
  // @Input() userId = '';

  @Output() searchFilters = new EventEmitter();
  @Output() resetFilters = new EventEmitter();

  articlesSearchFrom:any;
  formSubmitted = false;
  formLoaded = false;
  error = {
    status :false,
    msg: ''
  };
  success = {
    status :false,
    msg: ''
  };
  buttonName = 'Save';
  categories = [
    { key: 'id', value: 'Id'},
    { key: 'userId', value: 'User Id'},
    { key: 'title', value: 'Title'},
    { key: 'body', value: 'Body'},
  ];
  ngOnInit() {
    this.setSearchArticles();
  }

  setSearchArticles() {

    this.articlesSearchFrom = this.formBuilder.group({
      category: [null , Validators.required, ],
      searchword: [null, Validators.required, ],
    });

    this.formLoaded = true;
    this.changeDetector.markForCheck();
  }

  onSubmit() {
    this.formSubmitted = true;
    this.markFormGroupTouched(this.articlesSearchFrom);
    if (this.isFormValid()) {
      this.searchFilters.emit(this.articlesSearchFrom.value);
    }
  }

  isFieldInvalid(field: string) {
    return (
      (!this.articlesSearchFrom.get(field).valid &&
        (this.articlesSearchFrom.get(field).dirty || this.articlesSearchFrom.get(field).touched)) ||
      (this.articlesSearchFrom.get(field).untouched && this.articlesSearchFrom.get(field).errors && this.formSubmitted)
    );
  }

  isFormValid() {
    return this.articlesSearchFrom.valid;
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      if (control.controls) {
        control.markAsTouched();
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  trackByOption(id: number, data: { key: string }) {
    return data.key;
  }
  setOption(event: Event, key: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.articlesSearchFrom.get(key).setValue(filterValue);
  }

  onReset(){
    this.articlesSearchFrom.reset();
    this.resetFilters.emit(true);
  }
}
