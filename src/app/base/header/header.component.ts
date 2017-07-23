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
    this.authorizationService.authenticated
      .subscribe((authenticated:boolean)=>{ 
        console.log('logging...');
        if (!authenticated) {
          console.log('out..');
          this.router.navigate(['signin']);
        } 
      });
  }

  logout() {
    this.authorizationService.logout();
    this.router.navigate(['signin']);
  }

}
