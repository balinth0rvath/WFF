import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { NgModule } from '@angular/core';

@NgModule
({
    declarations: [
        SigninComponent,
        SignupComponent    
    ],
    imports: [],
    exports: [SigninComponent, SignupComponent]
})
export class AuthorizationModule {}