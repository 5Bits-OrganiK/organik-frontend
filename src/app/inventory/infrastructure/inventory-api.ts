import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { InventoryItem } from '../domain/model/inventory-item.entity';
import { apiEndpoints, platformApiBaseUrl } from '../../shared/infrastructure/api-endpoints';

@Injectable({ providedIn: 'root' })
export class InventoryApi {
  private readonly http = inject(HttpClient);

  getInventory(): Observable<InventoryItem[]> {
    return this.http
      .get<InventoryItem[]>(`${platformApiBaseUrl}${apiEndpoints.inventory}`)
      .pipe(map((response) => response.map((item) => new InventoryItem(item))));
  }
}
