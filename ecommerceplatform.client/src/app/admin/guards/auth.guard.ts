import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      take(1),
      map((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          this.router.navigate(['/admin/login']);
          return false;
        }
        return true;
      })
    );
  }
}