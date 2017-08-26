import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from './authorization/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
