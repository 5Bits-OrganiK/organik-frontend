import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ConservationRecord } from '../domain/model/conservation-record.entity';
import { apiEndpoints, platformApiBaseUrl } from '../../shared/infrastructure/api-endpoints';

@Injectable({ providedIn: 'root' })
export class ConservationApi {
  private readonly http = inject(HttpClient);

  getMonitoring(): Observable<ConservationRecord[]> {
    return this.http
      .get<ConservationRecord[]>(`${platformApiBaseUrl}${apiEndpoints.conservationMonitoring}`)
      .pipe(map((response) => response.map((item) => new ConservationRecord(item))));
  }
}
