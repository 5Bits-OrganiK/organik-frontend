import { Injectable, inject, signal } from '@angular/core';
import { ProcurementsApi } from '../infrastructure/procurements-api';
import { ProcurementOrder } from '../domain/model/procurement-order.entity';
import { Requisition } from '../../requisition/domain/model/requisition.entity';
import { User } from '../../iam/domain/model/user.entity';

const demoOrders = [
  new ProcurementOrder({ id: 'ship-1001', supplyRequestId: 'req-2', supplierId: 'sup-2', minimarketId: 'min-1', supplier: 'Anita Gamboa', minimarket: 'Minimarket Verde Sur', status: 'pending-reception', total: 315.8, createdAt: '2026-09-18', shippingDate: '2026-09-19', observations: 'Despacho refrigerado para lacteos.', items: [{ productName: 'Leche organica', quantity: 30, unitPrice: 7.2 }, { productName: 'Queso organico', quantity: 12, unitPrice: 14.5 }] }),
  new ProcurementOrder({ id: 'ship-1002', supplyRequestId: 'req-3', supplierId: 'sup-1', minimarketId: 'min-1', supplier: 'BioAndes Organic', minimarket: 'Minimarket Verde Sur', status: 'pending-reception', total: 228.4, createdAt: '2026-09-17', shippingDate: '2026-09-19', observations: 'Entrega parcial de vegetales frescos.', items: [{ productName: 'Tomate organico', quantity: 45, unitPrice: 3.8 }, { productName: 'Pepino organico', quantity: 20, unitPrice: 2.9 }] }),
  new ProcurementOrder({ id: 'ship-1003', supplyRequestId: 'req-5', supplierId: 'sup-2', minimarketId: 'min-1', supplier: 'Anita Gamboa', minimarket: 'Minimarket Verde Sur', status: 'received', total: 252.6, createdAt: '2026-09-15', shippingDate: '2026-09-16', receivedAt: '2026-09-16 15:40', observations: 'Recepcion aceptada sin observaciones.', items: [{ productName: 'Brocoli organico', quantity: 18, unitPrice: 6.3 }, { productName: 'Pimientos organicos', quantity: 24, unitPrice: 5.8 }] }),
  new ProcurementOrder({ id: 'ship-1004', supplyRequestId: 'req-4', supplierId: 'sup-2', minimarketId: 'min-1', supplier: 'Anita Gamboa', minimarket: 'Minimarket Verde Sur', status: 'rejected', total: 217.5, createdAt: '2026-09-16', shippingDate: '2026-09-17', rejectionReason: 'Solicitud rechazada por disponibilidad.', items: [{ productName: 'Queso organico', quantity: 15, unitPrice: 14.5 }] }),
];

@Injectable({ providedIn: 'root' })
export class ProcurementsStore {
  private readonly procurementsApi = inject(ProcurementsApi);
  readonly orders = signal<ProcurementOrder[]>(demoOrders);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  fetchOrders(): void {
    this.loading.set(true);
    this.procurementsApi.getOrders().subscribe({
      next: (orders) => {
        this.orders.set(orders);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar abastecimientos. Se muestran datos demo.');
        this.orders.set(demoOrders);
        this.loading.set(false);
      },
    });
  }

  visibleForUser(user: User | null): ProcurementOrder[] {
    if (!user) return [];
    if (user.roles?.includes('Proveedor Organico')) {
      return this.orders().filter((order) => order.supplierId === 'sup-2');
    }
    return this.orders().filter((order) => order.minimarketId === 'min-1');
  }

  createFromSupplyRequest(request: Requisition): string {
    const orderId = `ship-${Date.now().toString().slice(-5)}`;
    const items = request.items.map((item) => ({
      productName: item.productName,
      quantity: Number(item.quantity),
      unitPrice: item.unitPrice || 8.5,
    }));
    const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    this.orders.update((orders) => [
      new ProcurementOrder({
        id: orderId,
        supplyRequestId: request.id,
        supplierId: request.supplierId,
        minimarketId: request.minimarketId,
        supplier: request.supplier,
        minimarket: 'Minimarket Verde Sur',
        status: 'pending-reception',
        total: Number(total.toFixed(2)),
        createdAt: new Date().toISOString().slice(0, 10),
        shippingDate: new Date().toISOString().slice(0, 10),
        observations: 'Orden de envio generada desde una solicitud aceptada.',
        items,
      }),
      ...orders,
    ]);
    return orderId;
  }

  acceptReception(orderId: string): void {
    this.orders.update((orders) =>
      orders.map((order) =>
        order.id === orderId
          ? new ProcurementOrder({
              ...order,
              status: 'received',
              receivedAt: new Date().toISOString(),
              reception: {
                administratorId: 'usr-admin',
                accepted: true,
                comment: 'Recepcion aceptada; inventario listo para actualizar.',
                reviewedAt: new Date().toISOString(),
              },
            })
          : order,
      ),
    );
  }

  rejectReception(orderId: string, reason = 'Recepcion rechazada por diferencias en la entrega.'): void {
    this.orders.update((orders) =>
      orders.map((order) =>
        order.id === orderId
          ? new ProcurementOrder({
              ...order,
              status: 'rejected',
              receivedAt: new Date().toISOString(),
              rejectionReason: reason,
              reception: {
                administratorId: 'usr-admin',
                accepted: false,
                comment: reason,
                reviewedAt: new Date().toISOString(),
              },
            })
          : order,
      ),
    );
  }
}
