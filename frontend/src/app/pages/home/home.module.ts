import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from '@modules/login/login.module';
import { HomePageComponent } from './home.component';

const routes: Routes = [{ path: '', component: HomePageComponent }];

@NgModule({
  declarations: [HomePageComponent],
  imports: [RouterModule.forChild(routes), CommonModule, LoginModule], //
  exports: [RouterModule],
})
export class HomePageModule {}
