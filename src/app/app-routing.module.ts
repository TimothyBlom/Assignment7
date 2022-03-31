import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { CataloguePage } from './pages/catalogue/catalogue.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { AuthGuard } from './guards/auth.guard';
import { AccessGuard } from './guards/access.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    component: LoginPage,
    canActivate: [AccessGuard],
  },
  {
    path: 'catalogue',
    component: CataloguePage,
    canActivate: [AuthGuard],
  },
  {
    path: 'trainer',
    component: TrainerPage,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //import a module
  exports: [RouterModule], //expose module and features
})
export class AppRoutingModule {}
