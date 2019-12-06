import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthnService } from '../authn.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });

  valid: boolean = true;

  constructor(public activeModal: NgbActiveModal, private authn: AuthnService) { }

  ngOnInit() {
    
  }

  submitLogin() {
    this.authn.signIn(this.loginForm.value).subscribe(
      res => {
        console.log('Signed in! :)'); 
        this.activeModal.dismiss('Cross click');
      },
      err => {
        this.valid = false;
        console.log('Failed to log in: '); 
        console.log(err);
      }
    )
  }

}
