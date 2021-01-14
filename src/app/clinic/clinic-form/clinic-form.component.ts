import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicService } from 'src/app/services/clinic.service';

@Component({
  selector: 'app-clinic-form',
  templateUrl: './clinic-form.component.html',
  styleUrls: ['./clinic-form.component.css']
})
export class ClinicFormComponent implements OnInit {

  id: number = 0;

  clinicForm: FormGroup;
  isSubmitted: boolean = false;
  hasError: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private clinicService: ClinicService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.clinicFormBuilder();
  }

  get field() { return this.clinicForm.controls; }

  clinicFormBuilder(): void {
    this.clinicForm = this.fb.group({
      clinicName: [null, Validators.required]
    });

    const id = +this.route.snapshot.paramMap.get('id');

    if (id) {
      this.id = id;
      this.clinicForm.addControl('id', new FormControl({value: null, disabled: true}, Validators.required));

      this.clinicService.getResource(id).subscribe(
        response => {
          this.clinicForm.patchValue({id: id, clinicName: response.clinicName});
        },
        error => {
          this.hasError = true;
        }
      );
    }
  }

  submit(): void {
    this.isSubmitted = true;

    if (this.clinicForm.invalid || this.hasError) {
      return;
    }

    if (this.id) {
      this.regulation(); return;
    }

    this.insertion();
  }

  private insertion(): void {
    this.clinicService.postResource(this.clinicForm.getRawValue()).subscribe(() => {
      this.router.navigateByUrl('/clinics');
    });
  }

  private regulation(): void {
    this.clinicService.putResource(this.id, this.clinicForm.getRawValue()).subscribe(() => {
      this.router.navigateByUrl('/clinics');
    });
  }
}
