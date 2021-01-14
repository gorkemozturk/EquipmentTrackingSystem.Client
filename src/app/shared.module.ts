import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortDirective } from './directives/sort.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SortDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    SortDirective,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }