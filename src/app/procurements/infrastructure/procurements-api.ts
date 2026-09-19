import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProcurementOrder } from '../domain/model/procurement-order.entity';
import { apiEndpoints, platformApiBaseUrl } from '../../shared/infrastructure/api-endpoints';

@Injectable({ providedIn: 'root' })
export class ProcurementsApi {
  private readonly http = inject(HttpClient);

  getOrders(): Observable<ProcurementOrder[]> {
    return this.http
      .get<ProcurementOrder[]>(`${platformApiBaseUrl}${apiEndpoints.procurements}`)
      .pipe(map((response) => response.map((item) => new ProcurementOrder(item))));
  }
}
