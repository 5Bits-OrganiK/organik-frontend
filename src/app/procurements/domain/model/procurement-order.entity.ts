export interface ProcurementOrderItem {
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface ProcurementReception {
  administratorId: string;
  accepted: boolean;
  comment: string;
  reviewedAt: string;
}

export class ProcurementOrder {
  id: string;
  supplyRequestId: string | null;
  supplierId: string;
  minimarketId: string;
  supplier: string;
  minimarket: string;
  status: string;
  total: number;
  createdAt: string;
  shippingDate: string | null;
  receivedAt: string | null;
  observations: string;
  rejectionReason: string;
  reception: ProcurementReception | null;
  items: ProcurementOrderItem[];

  constructor(resource: Partial<ProcurementOrder> & Pick<ProcurementOrder, 'id' | 'supplier' | 'minimarket' | 'status' | 'total' | 'createdAt'>) {
    this.id = resource.id;
    this.supplyRequestId = resource.supplyRequestId || null;
    this.supplierId = resource.supplierId || 'sup-2';
    this.minimarketId = resource.minimarketId || 'min-1';
    this.supplier = resource.supplier;
    this.minimarket = resource.minimarket;
    this.status = resource.status;
    this.total = resource.total;
    this.createdAt = resource.createdAt;
    this.shippingDate = resource.shippingDate || null;
    this.receivedAt = resource.receivedAt || null;
    this.observations = resource.observations || '';
    this.rejectionReason = resource.rejectionReason || '';
    this.reception = resource.reception || null;
    this.items = resource.items || [];
  }

  get itemCount(): number {
    return this.items.length;
  }

  get canBeReviewed(): boolean {
    return this.status === 'pending-reception';
  }
}
