import { Injectable, inject, signal } from '@angular/core';
import { DashboardApi } from '../infrastructure/dashboard-api';
import { DashboardIndicator } from '../domain/model/dashboard-indicator.entity';

const demoIndicators = [
  new DashboardIndicator({ title: 'Stock disponible', type: 'inventory', value: 1248, variation: 8, severity: 'normal' }),
  new DashboardIndicator({ title: 'Requisiciones', type: 'requisition', value: 18, variation: 3, severity: 'normal' }),
  new DashboardIndicator({ title: 'Abastecimientos', type: 'procurements', value: 32, variation: 12, severity: 'normal' }),
  new DashboardIndicator({ title: 'Alertas activas', type: 'alerts', value: 4, variation: -2, severity: 'warning' }),
];

@Injectable({ providedIn: 'root' })
export class DashboardStore {
  private readonly dashboardApi = inject(DashboardApi);
  readonly indicators = signal<DashboardIndicator[]>(demoIndicators);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  fetchIndicators(): void {
    this.loading.set(true);
    this.error.set(null);
    this.dashboardApi.getIndicators().subscribe({
      next: (indicators) => {
        this.indicators.set(indicators);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar el dashboard desde la API. Se muestran datos demo.');
        this.indicators.set(demoIndicators);
        this.loading.set(false);
      },
    });
  }
}
