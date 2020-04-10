import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Authentication } from './auth.model';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _auth$ = new BehaviorSubject<Authentication>({
    authenticated: false
  });

  public auth$ = this._auth$.pipe(shareReplay(1));

  constructor() {}

  public login() {
    const login = window.open(
      `${window.location.origin}/auth/login`,
      'Log In',
      'menubar=no,toolbar=no,location=no,status=no'
    );
  }

  public logout() {
    const logout = window.open(
      `${window.location.origin}/auth/logout`,
      'Log Out',
      'menubar=no,toolbar=no,location=no,status=no'
    );
  }
}
