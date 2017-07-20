import { DashBoardComponent } from './dash-board/dash-board.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';

@NgModule
({
    declarations: [
        HeaderComponent,
        DashBoardComponent
    ],
    imports: [],
    exports: [HeaderComponent]
})
export class BaseModule {}