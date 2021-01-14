import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css']
})
export class EquipmentFormComponent implements OnInit {

  id: number = 0;
  clinicId: number = 0;

  equipmentForm: FormGroup;
  isSubmitted: boolean = false;
  hasError: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private equipmentService: EquipmentService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.clinicFormBuilder();
  }

  get field() { return this.equipmentForm.controls; }

  clinicFormBuilder(): void {
    this.clinicId = +this.route.snapshot.paramMap.get('clinicId');

    this.equipmentForm = this.fb.group({
      equipmentName: [null, Validators.required],
      suppliedAt: [null, Validators.pattern(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)],
      quantity: [null, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
      unitPrice: [null, [Validators.required, Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/)]],
      condition: [null, [Validators.required, Validators.pattern(/(^100([.]0{1,2})?)$|(^\d{1,2}([.]\d{1,2})?)$/)]],
      clinicId: [{value: this.clinicId, disabled: true}, Validators.required]
    });

    const id = +this.route.snapshot.paramMap.get('id');

    if (id) {
      this.id = id;
      this.equipmentForm.addControl('id', new FormControl({value: null, disabled: true}, Validators.required));
      this.equipmentForm.removeControl('clinicId');

      this.equipmentService.getResource(id).subscribe(
        response => {
          this.equipmentForm.patchValue({
            id: id, 
            equipmentName: response.equipmentName,
            suppliedAt: this.datePipe.transform(response.suppliedAt,"yyyy-MM-dd"),
            quantity: response.quantity,
            condition: response.condition,
            unitPrice: response.unitPrice
          });
        },
        error => {
          this.hasError = true;
        }
      );
    }
  }

  submit(): void {
    this.isSubmitted = true;

    if (this.equipmentForm.invalid || this.hasError) {
      return;
    }

    if (this.id) {
      this.regulation(); return;
    }

    this.insertion();
  }

  private insertion(): void {
    this.equipmentService.postEquipment(this.clinicId, this.equipmentForm.getRawValue()).subscribe(() => {
      this.router.navigateByUrl('/equipments');
    });
  }

  private regulation(): void {
    this.equipmentService.putResource(this.id, this.equipmentForm.getRawValue()).subscribe(() => {
      this.router.navigateByUrl('/equipments');
    });
  }
}
