import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitysComponent } from './components/citys/citys.component';
import { ApiComponent } from './components/api/api.component';
import { DataComponent } from './components/data/data.component';
import { InformationsComponent } from './components/informations/informations.component';


const routes: Routes = [
  /**
   * {
   *    path: 'le path correspond au chemin depuis la racine courante du routing module (faire attention quand notre routing module et un childModule)',
   *    component: Composant a projeter
   *    loadChildren: chemin de votre childModule (permet de faire du lazy loading),
   *    pathMatch: 'full' ou 'prefix' permet gerer une certaine pertinance sur des path (principalement entre routingModule enfant/parent)
   *    redirectTo: 'url of redirection'
   * },
   */
  { path: 'api', component: ApiComponent },
  { path: 'citys', component: CitysComponent },
  { path: 'data/:city', component: DataComponent },
  { path: 'informations', component: InformationsComponent },
  { path: '', component: InformationsComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
