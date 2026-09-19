import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DashboardIndicator } from '../domain/model/dashboard-indicator.entity';
import { apiEndpoints, platformApiBaseUrl } from '../../shared/infrastructure/api-endpoints';

@Injectable({ providedIn: 'root' })
export class DashboardApi {
  private readonly http = inject(HttpClient);

  getIndicators(): Observable<DashboardIndicator[]> {
    return this.http
      .get<{ indicators: DashboardIndicator[] }>(`${platformApiBaseUrl}${apiEndpoints.dashboard}`)
      .pipe(map((response) => response.indicators.map((item) => new DashboardIndicator(item))));
  }

  getOverview(): Observable<{ healthScore: number; indicators: any[]; activity: any[] }> {
    return this.http.get<{ healthScore: number; indicators: any[]; activity: any[] }>(
      `${platformApiBaseUrl}${apiEndpoints.dashboard}`,
    );
  }
}
