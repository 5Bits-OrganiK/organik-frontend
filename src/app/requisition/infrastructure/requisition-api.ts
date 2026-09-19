import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Requisition } from '../domain/model/requisition.entity';
import { apiEndpoints, platformApiBaseUrl } from '../../shared/infrastructure/api-endpoints';

@Injectable({ providedIn: 'root' })
export class RequisitionApi {
  private readonly http = inject(HttpClient);

  getRequisitions(): Observable<Requisition[]> {
    return this.http
      .get<Requisition[]>(`${platformApiBaseUrl}${apiEndpoints.requisitions}`)
      .pipe(map((response) => response.map((item) => new Requisition(item))));
  }
}
