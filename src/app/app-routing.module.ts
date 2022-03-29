import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './pages/login/login.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { TrainerComponent } from './pages/trainer/trainer.component';

const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "catalogue", component: CatalogueComponent },
    { path: "trainer", component: TrainerComponent }
];

    @NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
    export class AppRoutingModule {

}