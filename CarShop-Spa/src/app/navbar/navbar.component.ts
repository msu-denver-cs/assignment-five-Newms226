import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../authn/login/login.component';
import { AuthnService } from '../authn/authn.service';
import { RegisterComponent } from '../authn/register/register.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() selected: EventEmitter<string>;

  cssClasses = {
    cars: {
      active: true,
      'nav-item': true
    },
    makes: {
      active: false,
      'nav-item': true
    },
    parts: {
      active: false,
      'nav-item': true
    }
  }

  constructor(private authn: AuthnService, private modalService: NgbModal) {
    this.selected = new EventEmitter<string>();
  }

  ngOnInit() {
  }

  changeSelected(page: string) {
    Object.entries(this.cssClasses).map(([_, value]) => {
      value.active = false;
    })
    this.cssClasses[page].active = true;
    this.selected.emit(page);
  }

  openLogin() {
    this.modalService.open(LoginComponent);
  }

  openSignUp() {
    this.modalService.open(RegisterComponent);
  }

  signOut() {
    this.authn.signOut().subscribe(
      suc => console.log('Successfully signed out :)'),
      err => { console.log('Failed to sign out :/ :'); console.log(err)}
    )
  }


}
