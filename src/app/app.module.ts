import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AccountService } from './service/account.service';
import { AuthorizationService } from './authorization/authorization.service';
import { BaseModule } from './base/base.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SigninComponent } from './authorization/signin/signin.component';
import { SignupComponent } from './authorization/signup/signup.component';
import { HeaderComponent } from './base/header/header.component';
import { DashBoardComponent } from './base/dash-board/dash-board.component';
import { AreaComponent } from './admin/area/area.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AuthorizationModule,
    AppRoutingModule, 
    BaseModule,
    AdminModule
  ],
  providers: [AuthorizationService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }

