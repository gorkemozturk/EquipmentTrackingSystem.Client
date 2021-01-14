import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicListComponent } from './clinic-list/clinic-list.component';
import { ClinicFormComponent } from './clinic-form/clinic-form.component';

const routes: Routes = [
  {
    path: '',
    component: ClinicListComponent
  },
  {
    path: 'new',
    component: ClinicFormComponent
  },
  {
    path: ':id/edit',
    component: ClinicFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicRoutingModule { }
