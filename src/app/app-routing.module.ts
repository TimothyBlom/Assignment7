import { Component, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        component: LoginPage
    },
    {
        path: "catalogue",
        component: CataloguePage
    },
    {
        path: "trainer",
        component: TrainerPage
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],    //import a module
    exports: [RouterModule]     //expose module and features
})
export class AppRoutingModule {

}