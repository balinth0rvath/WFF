import { BrowserModule } from '@angular/platform-browser';
import { AuthRoutingModule } from './authorization-routing.module';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { NgModule } from '@angular/core';

@NgModule
({
    declarations: [
        SigninComponent,
        SignupComponent    
    ],
    imports: [FormsModule, AuthRoutingModule, BrowserModule]
})
export class AuthorizationModule {}