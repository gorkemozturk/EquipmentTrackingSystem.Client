import { NgModule } from '@angular/core';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';

const routes: Routes = [
  {
    path: '',
    component: EquipmentListComponent
  },
  {
    path: ':clinicId/new',
    component: EquipmentFormComponent
  },
  {
    path: ':id/edit',
    component: EquipmentFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule { }
