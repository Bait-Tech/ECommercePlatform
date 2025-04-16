import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ILogin } from '../../features/admin/interfaces/login.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  isAuthenticated$: Observable<boolean>;
  public currentUser: Observable<any>;
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    this.currentUserSubject = new BehaviorSubject<any>(parsedUser);
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(
      !!parsedUser && parsedUser.isAuthenticated
    );
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(login: ILogin) {
    return this.http.post<any>(`${this.apiUrl}/login`, login).pipe(
      map((user) => {
        user.isAuthenticated = true;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/admin/login']);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // private checkTokenExpiration() {
  //   const currentUser = this.currentUserValue;
  //   if (currentUser && currentUser.refreshTokenExpiration) {
  //     const expirationDate = new Date(currentUser.refreshTokenExpiration);
  //     if (expirationDate < new Date()) {
  //       this.logout();
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  // validateAuth(): boolean {
  //   if (this.checkTokenExpiration()) {
  //     return this.isAuthenticated();
  //   }
  //   return false;
  // }
}