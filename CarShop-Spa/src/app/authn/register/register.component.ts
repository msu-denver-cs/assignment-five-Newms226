import { Component, OnInit, Injector } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthnService, arePasswordsEqual } from '../authn.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginComponent } from '../login/login.component';

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
    'passwordConfirmation': new FormControl('', [Validators.required])
  });

  constructor(public activeModal: NgbActiveModal, 
              private authn: AuthnService,
              private modalService: NgbModal) { }

  ngOnInit() { }

  onSubmit() {
    this.authn.register(this.registerForm.value).subscribe(
      res => {
        console.log('Signed Up!');
        this.activeModal.dismiss();
      },
      errRes => {
        console.log('Failed to sign up');
        console.log(errRes);
        if (errRes.error.errors.email[0] === "has already been taken") {
          console.log('Email has already been taken :/')
          this.activeModal.dismiss();

          const email: string = this.registerForm.get('login').value
          const loginModal = this.modalService.open(LoginComponent);
          loginModal.componentInstance.errorMessage = 
            `'${email}' has an account registered already. Please log in.`;
        }
      }
    )
  }

}
