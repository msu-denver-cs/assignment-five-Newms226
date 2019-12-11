import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthnService } from '../authn.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    'login': new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    'password': new FormControl('', [
      Validators.required
    ])
  });

  private invalidCredentials: boolean = false;
  attemptSubmission: boolean = false;

  constructor(public activeModal: NgbActiveModal, private authn: AuthnService) { }

  ngOnInit() {
    
  }

  private get login() { return this.loginForm.get('login'); }
  private get password() { return this.loginForm.get('password'); }

  get isInvalid() { 
    return this.attemptSubmission && 
      (this.invalidCredentials || this.login.errors || this.password.errors) 
  }

  getErrorMessage() {
    // this.attemptSubmission = false;

    if (this.login.errors) {
      if (this.login.errors.required) {
        return 'Must supply email.';
      } else if (this.login.errors.email) {
        return 'Login must be a valid email.';
      }
    } else if (this.password.errors && this.password.errors.required) {
      return 'Must provide a password.';
    } else if (this.invalidCredentials) {
      return 'Invalid email/password.';
    }
  }

  submitLogin() {
    this.attemptSubmission = true;

    if (!this.login.errors && !this.password.errors) {
      this.authn.signIn(this.loginForm.value).subscribe(
        _ => {
          console.log('Signed in! :)'); 
          this.activeModal.dismiss('Cross click');
        },
        err => {
          this.invalidCredentials = true;
          console.log('Failed to log in: '); 
          console.log(err);
        }
      )
    }
  }

}
