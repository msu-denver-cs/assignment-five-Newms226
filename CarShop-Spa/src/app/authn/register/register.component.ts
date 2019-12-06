import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthnService } from '../authn.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('', [Validators.minLength(6)]),
    passwordConfirmation: new FormControl('', [Validators.minLength(6)])
  });

  constructor(public activeModal: NgbActiveModal, private authn: AuthnService) { }

  ngOnInit() { }

  onSubmit() {
    this.authn.register(this.registerForm.value).subscribe(
      res => console.log('Signed Up!'),
      err => console.log('Failed to sign up :/')
    )
  }

}
