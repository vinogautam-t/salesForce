import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent, SalesComponent, CustomersComponent, InventoriesComponent } from './pages';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'sales', component: SalesComponent },
  {path: 'customers', component: CustomersComponent},
  {path: 'inventory', component: InventoriesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
