import { Router } from '@angular/router';
import { AuthorizationService } from './../../authorization/authorization.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  constructor(private authenticationService: AuthorizationService,
              private router: Router) { }

  ngOnInit() {
    console.log('nn');
    if (!this.authenticationService.isAuthenticated()) {
      console.log('go');
      this.router.navigate(['signin']);
    }
  }
}
