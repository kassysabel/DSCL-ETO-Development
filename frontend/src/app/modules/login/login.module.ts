import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [
    LoginFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [
    LoginFormComponent
  ]
})
export class LoginModule { }
