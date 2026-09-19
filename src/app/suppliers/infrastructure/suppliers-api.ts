import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Supplier } from '../domain/model/supplier.entity';
import { apiEndpoints, platformApiBaseUrl } from '../../shared/infrastructure/api-endpoints';

@Injectable({ providedIn: 'root' })
export class SuppliersApi {
  private readonly http = inject(HttpClient);

  getSuppliers(): Observable<Supplier[]> {
    return this.http
      .get<Supplier[]>(`${platformApiBaseUrl}${apiEndpoints.suppliers}`)
      .pipe(map((response) => response.map((item) => new Supplier(item))));
  }
}
