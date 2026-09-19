import { Injectable, computed, inject, signal } from '@angular/core';
import { ConservationApi } from '../infrastructure/conservation-api';
import { ConservationRecord } from '../domain/model/conservation-record.entity';

const demoRecords = [
  new ConservationRecord({ id: 'con-1', zone: 'Camara fria A', productName: 'Yogurt organico', temperature: 4, humidity: 61, recordedAt: '2026-09-18 09:30', status: 'healthy' } as ConservationRecord),
  new ConservationRecord({ id: 'con-2', zone: 'Anaquel fresco', productName: 'Lechuga hidroponica', temperature: 9, humidity: 72, recordedAt: '2026-09-18 09:35', status: 'risk' } as ConservationRecord),
  new ConservationRecord({ id: 'con-3', zone: 'Almacen seco', productName: 'Quinua real', temperature: 19, humidity: 45, recordedAt: '2026-09-18 09:40', status: 'healthy' } as ConservationRecord),
];

@Injectable({ providedIn: 'root' })
export class ConservationStore {
  private readonly conservationApi = inject(ConservationApi);
  readonly records = signal<ConservationRecord[]>(demoRecords);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly riskCount = computed(() => this.records().filter((record) => record.isRisky).length);

  fetchMonitoring(): void {
    this.loading.set(true);
    this.conservationApi.getMonitoring().subscribe({
      next: (records) => {
        this.records.set(records);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar monitoreo. Se muestran datos demo.');
        this.records.set(demoRecords);
        this.loading.set(false);
      },
    });
  }
}
