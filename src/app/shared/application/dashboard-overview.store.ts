import { Injectable, inject, signal } from '@angular/core';
import { DashboardApi } from '../../dashboard/infrastructure/dashboard-api';

const fallbackOverview = {
  healthScore: 87,
  indicators: [
    { label: 'Inventario', value: '1,248', detail: 'unidades disponibles', icon: 'inventory_2', route: '/inventory' },
    { label: 'Alertas', value: '4', detail: 'requieren atencion', icon: 'notifications', route: '/communication' },
    { label: 'Pedidos', value: '3', detail: 'en seguimiento', icon: 'local_shipping', route: '/procurements' },
  ],
  activity: [
    { title: 'Lote proximo a vencer', detail: 'Yogurt organico vence en 5 dias.', time: '09:20', kind: 'warning' },
    { title: 'Pedido aceptado', detail: 'Proveedor BioAndes confirmado.', time: '10:45', kind: 'success' },
    { title: 'Sensor actualizado', detail: 'Camara fria dentro del rango.', time: '11:10', kind: 'info' },
  ],
};

@Injectable({ providedIn: 'root' })
export class DashboardOverviewStore {
  private readonly dashboardApi = inject(DashboardApi);
  readonly healthScore = signal(fallbackOverview.healthScore);
  readonly indicators = signal(fallbackOverview.indicators);
  readonly activity = signal(fallbackOverview.activity);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  fetchOverview(): void {
    this.loading.set(true);
    this.error.set(null);
    this.dashboardApi.getOverview().subscribe({
      next: (overview) => {
        this.healthScore.set(overview.healthScore);
        this.indicators.set(overview.indicators);
        this.activity.set(overview.activity);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Fake API no disponible. Se muestran datos locales.');
        this.healthScore.set(fallbackOverview.healthScore);
        this.indicators.set(fallbackOverview.indicators);
        this.activity.set(fallbackOverview.activity);
        this.loading.set(false);
      },
    });
  }
}
