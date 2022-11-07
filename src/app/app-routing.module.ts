import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GuestGuardService} from "./services/guards/guest-guard.service";
import {AuthGuardService} from "./services/guards/auth-guard.service";

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [GuestGuardService],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
