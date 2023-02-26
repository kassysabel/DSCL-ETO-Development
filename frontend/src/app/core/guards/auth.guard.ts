import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { UsersService } from '@lib/services/users/users.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService , private router: Router) {}
  canActivate(): Observable<boolean> | boolean {
    const url = new URL(window.location.href);
    return this.usersService.isUserLoggedIn.pipe(
      tap((v) => {
        if (!v) {
          // Forcing Guest User to redirect to Home Page
          window.location.href = `${environment.SITE_URL}`;
        }
        return v;
      })
    );
  }
}
