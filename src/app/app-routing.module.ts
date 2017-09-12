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


    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },

    {
        path: 'admin', canActivateChild: [AuthorizationGuardService],
        children: [
            { path: '', component: DashBoardComponent },
            { path: 'area', component: AreaComponent },
            { path: 'area/new', component: EditAreaComponent },
            { path: 'area/edit/:id', component: EditAreaComponent },
            { path: 'group', component: AreaComponent },
            { path: 'group/new', component: EditAreaComponent },
            { path: 'group/edit/:id', component: EditAreaComponent },
            { path: 'member', component: MemberComponent },
            { path: 'member/show/:id', component: EditMemberComponent }
        ]
    },
    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { path: '**', redirectTo: 'admin', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}