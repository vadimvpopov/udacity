import { Injectable } from '@angular/core';
import { User } from './models/user';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
const API_HOST = environment.apiHost;

interface JwtPayload {
  user: User;
}
const TOKEN_SECRET = "token-secret-for-jwt";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token:string = "";
  userId:number = 0;
  private redirectUrl: string | null = null;
  constructor(private http: HttpClient, private router: Router) { }

  authenticated(): boolean {
    return this.userId !== 0;
  }

  signIn(userData: User): Observable<void> {
    return this.http.post(`http://${API_HOST}/api/users/authenticate`, userData).pipe(
      map(token => this.handleToken(token as string))
    );
  }

  signUp(userData: User): Observable<void> {
    console.log("signing up!");
    console.log(userData);
    return this.http.post(`http://${API_HOST}/api/users`, userData).pipe(
      map(token => this.handleToken(token as string))
    );
  }

  setRedirectUrl(url: string): void { 
    this.redirectUrl = url;
  }

  handleToken(token: string): void {
    this.token = (token as string);
    let decoded = jwtDecode(this.token) as JwtPayload;
    this.userId = decoded.user.id || 0;
    console.log(`redirecting to ${this.redirectUrl}`);
    this.router.navigate([this.redirectUrl]);
    this.redirectUrl = null;
    console.log("decoded:", decoded);
  }
}


