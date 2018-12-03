import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent, SalesComponent, CustomersComponent } from './pages';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'sales', component: SalesComponent },
  {path: 'customers', component: CustomersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
