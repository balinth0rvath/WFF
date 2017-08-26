import { Router } from '@angular/router';
import { AuthorizationService } from './../../authorization/authorization.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authorizationService:AuthorizationService,
              private router: Router) { }

  ngOnInit() {

  }

  logout() {
    this.authorizationService.logout();
    this.router.navigate(['signin']);
  }

}
