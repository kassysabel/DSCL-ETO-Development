import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IArticle } from '@lib/services/articles/articles-interface';
import { ArticlesService } from '@lib/services/articles/articles.service';
import { Subject, take } from 'rxjs';

@Component({
  selector: 'app-articles-form',
  templateUrl: './articles-form.component.html',
  styleUrls: ['./articles-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesFormComponent  implements OnInit  { //AfterViewInit,
  private readonly _destroy$ = new Subject<boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private readonly changeDetector: ChangeDetectorRef,
    private articleService: ArticlesService,
  ) {}
  @Input() articleDetails:any = null ;
  @Input() userId = '';
  articlesDetailsFrom:any;
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
  ngOnInit() {
    this.setArticles();
  }

  setArticles() {
    this.buttonName = (this.userId === '' && this.articleDetails) ? 'Update' : 'Save';
    let titleItem = this.articleDetails && this.articleDetails.title ? this.articleDetails.title : null;
    let bodyItem = this.articleDetails && this.articleDetails.body ? this.articleDetails.body : null;
    let dateItem = null;

    let formFields: any = {
      title: [titleItem , Validators.required, ],
      body: [bodyItem, Validators.required, ],
    };

    if (this.articleDetails && this.articleDetails.date) {
      let d = new Date(this.articleDetails.date);
      dateItem = this.formatDateStr(d);
      formFields = {
        ...formFields,
        date : [dateItem , Validators.required, ]
      }
    }

    this.articlesDetailsFrom = this.formBuilder.group(formFields);

    this.formLoaded = true;
    this.changeDetector.markForCheck();
  }

  onSubmit() {
    this.formSubmitted = true;
    this.markFormGroupTouched(this.articlesDetailsFrom);
    if (this.isFormValid()) {
      let thisArticleValue = this.articlesDetailsFrom.value;

      if(this.articleDetails) {
        this.updateArticle(thisArticleValue);
      } else if(this.userId !== '' && this.articleDetails == null){
        this.createArticle(thisArticleValue);
      } else {
        this.statusUpdate({success: false, msg:  'Did not submit. Please Try again'});
      }
    } else {
      this.statusUpdate({success: false, msg: 'Please complete the required fields.', reset: true, scrollTop: true});
    }
  }

  isFieldInvalid(field: string) {
    return (
      (!this.articlesDetailsFrom.get(field).valid &&
        (this.articlesDetailsFrom.get(field).dirty || this.articlesDetailsFrom.get(field).touched)) ||
      (this.articlesDetailsFrom.get(field).untouched && this.articlesDetailsFrom.get(field).errors && this.formSubmitted)
    );
  }

  isFormValid() {
    return this.articlesDetailsFrom.valid;
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

  updateArticle(data = {}) {
    this.articleService
    .updateArticle(this.articleDetails.id, data)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.statusUpdate({success: true, msg: 'Updated successfully.'});
        },
        error: (err) => {
          this.statusUpdate({success: false, msg: err.statusText});
        }
      });
  }

  createArticle(data: any) {
    this.articleService
    .createArticle(this.userId, data.title, data.body)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.statusUpdate({success: true, msg: 'Added successfully.'});
        },
        error: (err) => {
          this.statusUpdate({success: false, msg: err.statusText});
        }
      });
  }

  statusUpdate(params:any) {
    let baseParams = {
      status:true,
      msg: params.msg
    }
    if(params.success) {
      this.success = baseParams;
    } else {
      this.error = baseParams;
    }
    if(params.reset) {
      setTimeout(() => {
        this.success =   { status:false, msg: '' };
        this.error =  { status:false, msg: '' };
      }, 5000);
    }

    if(params.scrollTop) {
      window.scrollTo(0, 0);
    }

    console.log('isSuccess: ', params.success, 'details:', baseParams)
    this.formSubmitted = false;
    this.changeDetector.detectChanges();
  }

  formatDateStr(d: any) {
    return d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +("0" + d.getDate()).slice(-2) ;

    // + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

  }
}
