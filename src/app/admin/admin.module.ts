import { BaseModule } from './../base/base.module';
import { PaginationComponent } from './../base/pagination/pagination.component';
import { ModalModule } from 'ng2-modal';
import { BrowserModule } from '@angular/platform-browser';
import { AreaComponent } from './area/area.component';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { EditAreaComponent } from './area/edit-area/edit-area.component';
@NgModule({
    declarations: [AreaComponent, EditAreaComponent],
    imports: [BrowserModule,ReactiveFormsModule,ModalModule, BaseModule],
    exports: [AreaComponent]
})
export class AdminModule { }