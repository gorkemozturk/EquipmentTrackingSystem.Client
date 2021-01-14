import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap, debounceTime, switchMap, share } from 'rxjs/operators';
import { Equipment } from 'src/app/models/equipment';
import { Params } from 'src/app/models/params';
import { EquipmentService } from 'src/app/services/equipment.service';
import { ParamsService } from 'src/app/services/params.service';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {
  equipments: Equipment[] = [];
  isPending: boolean = false;
  subject = new BehaviorSubject<Params>(new Params());

  constructor(private equipmentService: EquipmentService, private paramsService: ParamsService) { }

  ngOnInit() {
    this.getEquipments();
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }

  getEquipments(): void {
    const result = this.subject.pipe(
      tap(() => this.isPending = true),
      debounceTime(750),
      switchMap((params: Params) => this.equipmentService.getResources(params))
    );

    result.subscribe(response => {
      const pagination = JSON.parse(response.headers.get('X-Pagination'));
      
      this.equipments = response.body;
      this.paramsService.setParams(pagination);
      this.isPending = false;
    });
  }

  delete(equipment: Equipment): void {
    if (!confirm('Are you sure you want to delete this equipment?')) {
      return;
    }

    this.equipmentService.deleteResource(equipment.id).subscribe(() => {
      this.equipments = this.equipments.filter(c => c.id != equipment.id);
    });
  }
}
