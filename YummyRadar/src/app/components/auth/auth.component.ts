import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Services/auth.service';

@Component({
  selector: 'app-auth',
  template: 
  `
    <header class="row spacing">
      <nav class="col-md-8 col-md-offset-2">
        <ul class="nav nav-tabs">

        </ul>
      </nav>
    </header>
    <div class="row spacing">
      <router-outlet></router-outlet>
    </div>
    `
})
export class AuthComponent {
  constructor(private authService: AuthService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
