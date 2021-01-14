import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: 'clinics',
    loadChildren: () => import('./clinic/clinic.module').then(m => m.ClinicModule)
  },
  {
    path: 'equipments',
    loadChildren: () => import('./equipment/equipment.module').then(m => m.EquipmentModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }