import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicRoutingModule } from './clinic-routing.module';
import { ClinicListComponent } from './clinic-list/clinic-list.component';
import { ClinicFormComponent } from './clinic-form/clinic-form.component';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    ClinicRoutingModule,
    SharedModule
  ],
  declarations: [ClinicListComponent, ClinicFormComponent],
})
export class ClinicModule { }