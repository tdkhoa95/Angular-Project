import { Routes } from "@angular/router";
import { MainComponent } from './main.component';

export const MainRouters: Routes = [{
    path: '', component: MainComponent, children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', loadChildren: './home/home.module#HomeModule' },
        { path: 'user', loadChildren: './user/user.module#UserModule' },
        { path: 'roles', loadChildren: './role/role.module#RoleModule' }

    ]
}]