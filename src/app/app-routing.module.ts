import { EditAreaComponent } from './admin/area/edit-area/edit-area.component';
import { AreaComponent } from './admin/area/area.component';
import { SignupComponent } from './authorization/signup/signup.component';
import { SigninComponent } from './authorization/signin/signin.component';
import { DashBoardComponent } from './base/dash-board/dash-board.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
    { path: '', component: DashBoardComponent },
    { path: 'home', component: DashBoardComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent},
    { path: 'area', component: AreaComponent},
    { path: 'area/new', component: EditAreaComponent},
    { path: 'area/edit/:id', component: EditAreaComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes,{preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}