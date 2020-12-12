import { Route } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCreateComponent } from './lists/list-create.component';
import { AuthGuard } from './visitor/login/auth.guard';
import { LoginComponent } from './visitor/login/login.component';
import { SignupComponent } from './visitor/login/signup.component';
import { VisitorPageComponent } from './visitor/visitor.component';


const routes: Routes = [
    { path: '', component: VisitorPageComponent },
    { path: 'user', component: ListCreateComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },

    //{ path: 'admin', component: AdminPageComponent },
    

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class AppRoutingModule {

}