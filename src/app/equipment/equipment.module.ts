import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { EquipmentRoutingModule } from './equipment-routing.module';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
import { SharedModule } from '../shared.module';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    SharedModule
  ],
  declarations: [EquipmentListComponent, EquipmentFormComponent],
  providers: [
    DatePipe
  ]
})
export class EquipmentModule { }
