import { DropdownDirective } from './dropdown.directive';
import { AuthRoutingModule } from './../authorization/authorization-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule
    ({
        declarations: [
            HeaderComponent,
            DashBoardComponent,
            DropdownDirective,
            SidebarComponent
        ],
        imports: [BrowserModule],
        exports: [HeaderComponent,
            SidebarComponent]
    })
export class BaseModule { }