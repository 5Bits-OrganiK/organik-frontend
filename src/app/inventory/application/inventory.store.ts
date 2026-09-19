import { Injectable, computed, inject, signal } from '@angular/core';
import { InventoryApi } from '../infrastructure/inventory-api';
import { InventoryItem } from '../domain/model/inventory-item.entity';
import { ProcurementOrderItem } from '../../procurements/domain/model/procurement-order.entity';

const demoItems = [
  new InventoryItem({ id: 'inv-1', productName: 'Lechugas organicas', stock: 42, minimumStock: 20, lotCode: 'LOT-001', expirationDate: '2026-09-25', status: 'healthy' } as InventoryItem),
  new InventoryItem({ id: 'inv-2', productName: 'Yogurt organico', stock: 12, minimumStock: 18, lotCode: 'LOT-014', expirationDate: '2026-09-22', status: 'risk' } as InventoryItem),
  new InventoryItem({ id: 'inv-3', productName: 'Tomate organico', stock: 60, minimumStock: 25, lotCode: 'LOT-021', expirationDate: '2026-09-28', status: 'healthy' } as InventoryItem),
  new InventoryItem({ id: 'inv-4', productName: 'Manzanas organicas', stock: 75, minimumStock: 30, lotCode: 'LOT-022', expirationDate: '2026-10-05', status: 'healthy' } as InventoryItem),
  new InventoryItem({ id: 'inv-5', productName: 'Pepino organico', stock: 38, minimumStock: 18, lotCode: 'LOT-023', expirationDate: '2026-09-27', status: 'healthy' } as InventoryItem),
  new InventoryItem({ id: 'inv-6', productName: 'Zanahoria organica', stock: 54, minimumStock: 22, lotCode: 'LOT-024', expirationDate: '2026-10-02', status: 'healthy' } as InventoryItem),
  new InventoryItem({ id: 'inv-7', productName: 'Brocoli organico', stock: 31, minimumStock: 16, lotCode: 'LOT-025', expirationDate: '2026-09-29', status: 'healthy' } as InventoryItem),
  new InventoryItem({ id: 'inv-8', productName: 'Pimientos organicos', stock: 44, minimumStock: 20, lotCode: 'LOT-026', expirationDate: '2026-10-01', status: 'healthy' } as InventoryItem),
  new InventoryItem({ id: 'inv-9', productName: 'Queso organico', stock: 20, minimumStock: 14, lotCode: 'LOT-027', expirationDate: '2026-09-30', status: 'healthy' } as InventoryItem),
  new InventoryItem({ id: 'inv-10', productName: 'Leche organica', stock: 36, minimumStock: 24, lotCode: 'LOT-028', expirationDate: '2026-09-24', status: 'healthy' } as InventoryItem),
];

@Injectable({ providedIn: 'root' })
export class InventoryStore {
  private readonly inventoryApi = inject(InventoryApi);
  readonly items = signal<InventoryItem[]>(demoItems);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly lowStockCount = computed(() => this.items().filter((item) => item.isLowStock).length);

  fetchInventory(): void {
    this.loading.set(true);
    this.inventoryApi.getInventory().subscribe({
      next: (items) => {
        this.items.set(items);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar inventario. Se muestran datos demo.');
        this.items.set(demoItems);
        this.loading.set(false);
      },
    });
  }

  receiveShipmentItems(shipmentItems: ProcurementOrderItem[] = []): void {
    const nextItems = this.items().map((inventoryItem) => {
      const shipmentItem = shipmentItems.find((item) => item.productName === inventoryItem.productName);
      if (!shipmentItem) return inventoryItem;

      const next = new InventoryItem({ ...inventoryItem, stock: inventoryItem.stock + Number(shipmentItem.quantity || 0) } as InventoryItem);
      next.status = next.stock <= next.minimumStock ? 'risk' : 'healthy';
      return next;
    });
    this.items.set(nextItems);
  }
}
