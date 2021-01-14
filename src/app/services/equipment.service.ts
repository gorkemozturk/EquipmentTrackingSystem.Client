import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Equipment } from '../models/equipment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService extends BaseService {

  constructor(http: HttpClient, private _http: HttpClient) {
    super(environment.apiUrl + 'equipments', http);
  }

  postEquipment(clinicId: number, resource: Equipment): Observable<Equipment> {
    return this._http.post<Equipment>(environment.apiUrl + 'equipments/' + clinicId, resource).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

}
