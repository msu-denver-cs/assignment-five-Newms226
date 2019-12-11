import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthnService, arePasswordsEqual } from '../authn.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    'login': new FormControl('', {
      validators: [Validators.email, Validators.required],
      updateOn: 'blur'
    }),
    'password': new FormControl('', {
      validators: [Validators.minLength(6), Validators.required],
      updateOn: 'blur'
    }),
    'passwordConfirmation': new FormControl('')
  });

  private attemptSubmission: boolean = false;
  private errors: string[];

  private get login() { return this.registerForm.get('login'); }
  private get password() { return this.registerForm.get('password'); }

  constructor(public activeModal: NgbActiveModal, private authn: AuthnService) { }

  ngOnInit() { }

  buildErrorMessages() {
    this.errors = [];

    if (this.login.errors) {
      if (this.login.errors.required) {
        this.errors.push('Must supply an email');
      }
      if (this.login.errors.email) {
        this.errors.push('Must supply a valid email');
      }
    }
    
    if (this.password.errors) {
      if (this.password.errors.required) {
        this.errors.push('Must supply a password');
      }
      if (this.password.errors.minLength) {
        return 'Password must be at least 6 characters';
      }
    } else if (!arePasswordsEqual(this.registerForm)) {
      return 'Passwords do not match';
    }
  }

  // getErrorMessage() {
  //   if (this.login.errors) {
  //     if (this.login.errors.required) {
  //       return 'Must supply an email';
  //     } else if (this.login.errors.email) {
  //       return 'Must supply a valid email';
  //     }
  //   } else if (this.password.errors) {
  //     if (this.password.errors.required) {
  //       return 'Must supply a password';
  //     } else if (this.password.errors.minLength) {
  //       return 'Password must be at least 6 characters';
  //     }
  //   } else if (!arePasswordsEqual(this.registerForm)) {
  //     return 'Passwords do not match';
  //   }
  // }

  isInvalid() {
    return this.attemptSubmission && 
      ( this.login.errors || this.password.errors || !arePasswordsEqual(this.registerForm) );
  }

  onSubmit() {
    this.attemptSubmission = true;

    this.authn.register(this.registerForm.value).subscribe(
      res => console.log('Signed Up!'),
      err => {
        console.log('Failed to sign up')
        console.log(err.error.errors.email)
      }
    )
  }

}
