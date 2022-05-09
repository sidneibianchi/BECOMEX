import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';

const routes: Routes = [
  {path: 'countries', component: CountriesComponent},
  {path: '', redirectTo: 'countries', pathMatch:'full'},
  {path: '**', redirectTo: 'countries', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
