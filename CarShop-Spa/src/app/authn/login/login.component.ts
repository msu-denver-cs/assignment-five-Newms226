import { Component, OnInit, Optional, Input } from '@angular/core';
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
  @Input() errorMessage: string;
  @Input() email: string;

  loginForm = new FormGroup({
    'login': new FormControl(this.email || '', [
      Validators.email,
      Validators.required
    ]),
    'password': new FormControl('', [
      Validators.required
    ])
  });


  constructor(public activeModal: NgbActiveModal, private authn: AuthnService) { }

  ngOnInit() {
    
  }

  submitLogin() {
    // if (!this.login.errors && !this.password.errors) {
      this.authn.signIn(this.loginForm.value).subscribe(
        _ => {
          console.log('Signed in! :)'); 
          this.activeModal.dismiss('Cross click');
        },
        err => {
          console.log('Failed to log in: '); 
          console.log(err);
          this.errorMessage = 'Invalid login credentials.'
        }
      )
    // }
  }

}
