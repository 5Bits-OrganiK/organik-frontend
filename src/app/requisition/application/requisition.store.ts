import { Injectable, inject, signal } from '@angular/core';
import { RequisitionApi } from '../infrastructure/requisition-api';
import { Requisition } from '../domain/model/requisition.entity';
import { User } from '../../iam/domain/model/user.entity';

const demoRequisitions = [
  new Requisition({ id: 'req-1', minimarketId: 'min-1', supplierId: 'sup-2', requester: 'Albino Caceres', supplier: 'Anita Gamboa', productName: 'Yogurt organico', quantity: 24, reason: 'Reposicion por venta rapida', status: 'pending', createdAt: '2026-09-18', items: [{ productName: 'Yogurt organico', quantity: 24 }] }),
  new Requisition({ id: 'req-2', minimarketId: 'min-1', supplierId: 'sup-2', requester: 'Albino Caceres', supplier: 'Anita Gamboa', productName: 'Leche organica', quantity: 30, reason: 'Demanda semanal de lacteos', status: 'accepted', createdAt: '2026-09-18', reviewedAt: '2026-09-18 11:00', shippingOrderId: 'ship-1001', items: [{ productName: 'Leche organica', quantity: 30 }, { productName: 'Queso organico', quantity: 12 }] }),
  new Requisition({ id: 'req-3', minimarketId: 'min-1', supplierId: 'sup-1', requester: 'Albino Caceres', supplier: 'BioAndes Organic', productName: 'Tomate organico', quantity: 45, reason: 'Reposicion para anaquel principal', status: 'pending', createdAt: '2026-09-17', items: [{ productName: 'Tomate organico', quantity: 45 }, { productName: 'Pepino organico', quantity: 20 }] }),
  new Requisition({ id: 'req-4', minimarketId: 'min-1', supplierId: 'sup-2', requester: 'Albino Caceres', supplier: 'Anita Gamboa', productName: 'Queso organico', quantity: 15, reason: 'Stock minimo alcanzado', status: 'rejected', createdAt: '2026-09-16', reviewedAt: '2026-09-16 16:20', rejectionReason: 'Produccion diaria agotada', items: [{ productName: 'Queso organico', quantity: 15 }] }),
  new Requisition({ id: 'req-5', minimarketId: 'min-1', supplierId: 'sup-2', requester: 'Albino Caceres', supplier: 'Anita Gamboa', productName: 'Brocoli organico', quantity: 18, reason: 'Campana de productos frescos', status: 'accepted', createdAt: '2026-09-15', reviewedAt: '2026-09-15 12:15', shippingOrderId: 'ship-1003', items: [{ productName: 'Brocoli organico', quantity: 18 }, { productName: 'Pimientos organicos', quantity: 24 }] }),
];

@Injectable({ providedIn: 'root' })
export class RequisitionStore {
  private readonly requisitionApi = inject(RequisitionApi);
  readonly requisitions = signal<Requisition[]>(demoRequisitions);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  fetchRequisitions(): void {
    this.loading.set(true);
    this.requisitionApi.getRequisitions().subscribe({
      next: (requisitions) => {
        this.requisitions.set(requisitions);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar requisiciones. Se muestran datos demo.');
        this.requisitions.set(demoRequisitions);
        this.loading.set(false);
      },
    });
  }

  visibleForUser(user: User | null): Requisition[] {
    if (!user) return [];
    if (user.roles?.includes('Proveedor Organico')) {
      return this.requisitions().filter((request) => request.supplierId === 'sup-2');
    }
    return this.requisitions().filter((request) => request.minimarketId === 'min-1');
  }

  acceptRequest(requestId: string, supplierId = 'sup-2'): void {
    this.requisitions.update((items) =>
      items.map((request) =>
        request.id === requestId
          ? new Requisition({
              ...request,
              status: 'accepted',
              reviewedAt: new Date().toISOString(),
              response: {
                id: `res-${request.id}`,
                supplierId,
                accepted: true,
                comment: 'Solicitud aceptada por el proveedor.',
                respondedAt: new Date().toISOString(),
              },
            })
          : request,
      ),
    );
  }

  rejectRequest(requestId: string, reason = 'Solicitud rechazada por disponibilidad.'): void {
    this.requisitions.update((items) =>
      items.map((request) =>
        request.id === requestId
          ? new Requisition({
              ...request,
              status: 'rejected',
              reviewedAt: new Date().toISOString(),
              rejectionReason: reason,
              response: {
                id: `res-${request.id}`,
                supplierId: request.supplierId,
                accepted: false,
                comment: reason,
                respondedAt: new Date().toISOString(),
              },
            })
          : request,
      ),
    );
  }

  linkShippingOrder(requestId: string, orderId: string): void {
    this.requisitions.update((items) =>
      items.map((request) =>
        request.id === requestId ? new Requisition({ ...request, shippingOrderId: orderId }) : request,
      ),
    );
  }
}
