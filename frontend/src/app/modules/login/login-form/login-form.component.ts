import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@environments/environment';
import { IArticle } from '@lib/services/articles/articles-interface';
import { ArticlesService } from '@lib/services/articles/articles.service';
import { CookieService } from '@lib/services/storage/cookie.service';
import { UsersService } from '@lib/services/users/users.service';
import { Subject, take, takeUntil } from 'rxjs';

//UsersService

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent  implements OnInit  {
  private readonly _destroy$ = new Subject<boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private readonly changeDetector: ChangeDetectorRef,
    private usersService: UsersService,
    private cookieService: CookieService
  ) {}

  loginDetailsFrom:any;
  formSubmitted = false;
  formLoaded = false;
  error = {
    status :false,
    msg: ''
  };
  ngOnInit() {
    this.setLoginForm();
  }

  setLoginForm() {
    this.loginDetailsFrom = this.formBuilder.group({
      username: [null , Validators.required, ],
      email: [null, Validators.required, ],
    });
    this.formLoaded = true;
    this.changeDetector.markForCheck();
  }

  onSubmit() {
    this.formSubmitted = true;
    this.markFormGroupTouched(this.loginDetailsFrom);
    if (this.isFormValid()) {
      //this.loginDetailsFrom.value;
        this.usersService
          .login(this.loginDetailsFrom.value)
          .pipe(takeUntil(this._destroy$))
          .subscribe({
            next: (data:any) => {
                const aExpDate = new Date(Date.now() + (100000*1000));
                this.cookieService.set('userToken', data.id, { expires: aExpDate });

                this.usersService.updateLogInState();
                this.formSubmitted = false;
                this.changeDetector.detectChanges();
                window.location.href = `${environment.SITE_URL}/articles`;
            },
            error: (error) => {
              let msgErr = 'Please Contact the Admin';
              if(error.status == 400) {
                msgErr = 'Invalid Credentials. Please Try again.';
              }
              this.error =  {
                status: true,
                msg: msgErr
              };
              console.log(this.error, error);
              this.formSubmitted = false;
              this.changeDetector.detectChanges();
            },
          });
    } else {

      this.error =  {
        status:true,
        msg: 'Unknonw Error Please Try again'
      };
      setTimeout(() => {
        this.error =  {
          status:false,
          msg: ''
        };
      }, 5000);

      this.formSubmitted = false;
      window.scrollTo(0, 0);
    }
  }

  isFieldInvalid(field: string) {
    return (
      (!this.loginDetailsFrom.get(field).valid &&
        (this.loginDetailsFrom.get(field).dirty || this.loginDetailsFrom.get(field).touched)) ||
      (this.loginDetailsFrom.get(field).untouched && this.loginDetailsFrom.get(field).errors && this.formSubmitted)
    );
  }

  isFormValid() {
    return this.loginDetailsFrom.valid;
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
}
