import { AuthRoutingModule } from './../authorization/authorization-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';

@NgModule
({
    declarations: [
        HeaderComponent,
        DashBoardComponent
    ],
    imports: [BrowserModule],
    exports: [HeaderComponent]
})
export class BaseModule {}