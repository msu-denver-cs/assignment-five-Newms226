import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private tokenService: AngularTokenService) { 
    console.log('ATTEMPT AUTN')
    this.tokenService.signIn({
      login: 'test@test.com',
      password: 'admin123'
    }).subscribe(
      res => console.log(res),
      error => console.log(error)
    )
  }

  ngOnInit() {
    
  }

}
