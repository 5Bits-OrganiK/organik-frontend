import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OperationalIndicator } from '../domain/model/operational-indicator.entity';
import { apiEndpoints, platformApiBaseUrl } from '../../shared/infrastructure/api-endpoints';

@Injectable({ providedIn: 'root' })
export class AnalyticsApi {
  private readonly http = inject(HttpClient);

  getSummary(): Observable<{ indicators: OperationalIndicator[]; reportSummaries: Record<string, any> }> {
    return this.http
      .get<{ indicators: OperationalIndicator[]; reportSummaries?: Record<string, any> }>(
        `${platformApiBaseUrl}${apiEndpoints.analytics}`,
      )
      .pipe(
        map((response) => ({
          indicators: response.indicators.map((item) => new OperationalIndicator(item)),
          reportSummaries: response.reportSummaries || {},
        })),
      );
  }
}
