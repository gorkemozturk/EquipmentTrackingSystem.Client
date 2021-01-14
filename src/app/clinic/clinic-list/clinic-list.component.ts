import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Clinic } from 'src/app/models/clinic';
import { ClinicService } from 'src/app/services/clinic.service';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { Params } from 'src/app/models/params';
import { ParamsService } from 'src/app/services/params.service';

@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
  styleUrls: ['./clinic-list.component.css']
})
export class ClinicListComponent implements OnInit, OnDestroy {
  clinics: Clinic[] = [];
  isPending: boolean = false;
  subject = new BehaviorSubject<Params>(new Params());

  constructor(private clinicService: ClinicService, private paramsService: ParamsService) { }

  ngOnInit() {
    this.getClinics();
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }

  getClinics(): void {
    const result = this.subject.pipe(
      tap(() => this.isPending = true),
      debounceTime(750),
      switchMap((params: Params) => this.clinicService.getResources(params))
    );

    result.subscribe(response => {
      const pagination = JSON.parse(response.headers.get('X-Pagination'));
      
      this.clinics = response.body;
      this.paramsService.setParams(pagination);
      this.isPending = false;
    });
  }

  delete(clinic: Clinic): void {
    if (!confirm('Are you sure you want to delete "' + clinic.clinicName + '"?') || clinic.equipmentCount > 0) {
      return;
    }

    this.clinicService.deleteResource(clinic.id).subscribe(() => {
      this.clinics = this.clinics.filter(c => c.id != clinic.id);
    });
  }
}
