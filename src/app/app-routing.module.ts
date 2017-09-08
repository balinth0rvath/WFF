import { AuthorizationGuardService } from './authorization/authorization-guard.service';
import { EditMemberComponent } from './admin/member/edit-member/edit-member.component';
import { MemberComponent } from './admin/member/member.component';
import { EditAreaComponent } from './admin/area/edit-area/edit-area.component';
import { AreaComponent } from './admin/area/area.component';
import { SignupComponent } from './authorization/signup/signup.component';
import { SigninComponent } from './authorization/signin/signin.component';
import { DashBoardComponent } from './base/dash-board/dash-board.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
    { path: '', canActivate: [AuthorizationGuardService],component: DashBoardComponent },
    { path: 'home',  canActivate: [AuthorizationGuardService],component: DashBoardComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent},
    { path: 'area',canActivate: [AuthorizationGuardService], component: AreaComponent},
    { path: 'area/new', canActivate: [AuthorizationGuardService],component: EditAreaComponent},
    { path: 'area/edit/:id', canActivate: [AuthorizationGuardService],component: EditAreaComponent},
    { path: 'group', canActivate: [AuthorizationGuardService],component: AreaComponent},
    { path: 'group/new', canActivate: [AuthorizationGuardService],component: EditAreaComponent},
    { path: 'group/edit/:id', canActivate: [AuthorizationGuardService],component: EditAreaComponent},
    { path: 'member', canActivate: [AuthorizationGuardService], component: MemberComponent},
    { path: 'member/show/:id', canActivate: [AuthorizationGuardService],component: EditMemberComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes,{preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}