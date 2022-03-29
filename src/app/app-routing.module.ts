import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { CataloguePage } from './pages/catalogue/catalogue.page';
import { TrainerPage } from './pages/trainer/trainer.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'catalogue',
    component: CataloguePage,
  },
  {
    path: 'trainer',
    component: TrainerPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //import a module
  exports: [RouterModule], //expose module and features
})
export class AppRoutingModule {}
