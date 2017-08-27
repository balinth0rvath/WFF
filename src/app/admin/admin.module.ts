import { BrowserModule } from '@angular/platform-browser';
import { AreaComponent } from './area/area.component';
import { NgModule } from '@angular/core';
@NgModule({
    declarations: [AreaComponent],
    imports: [BrowserModule],
    exports: [AreaComponent]
})
export class AdminModule { }