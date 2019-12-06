import { Injectable } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Observable } from 'rxjs';

export interface UserSignIn {
  login: string;
  password: string;
}

export interface NewUser {
  login: string;
  password: string;
  passwordConfirmation: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthnService {

  constructor(private tokenService: AngularTokenService) { 
    // this.signOut().subscribe(res => console.log('success! logged out. '), err => console.log(err));
    console.log('AUTHN SERVICE CREATED. User signed in: ' + this.userSignedIn())
  }

  signIn(config: UserSignIn): Observable<Response> {
    return this.tokenService.signIn(config);
  }

  signOut(): Observable<Response> {
    return this.tokenService.signOut();
  }

  register(newUser: NewUser): Observable<Response> {
    return this.tokenService.registerAccount({...newUser});
  }

  userSignedIn() {
    return this.tokenService.userSignedIn();
  }
}
