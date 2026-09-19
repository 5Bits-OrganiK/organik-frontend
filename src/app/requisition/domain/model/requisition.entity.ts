export interface RequisitionItem {
  productName: string;
  quantity: number;
  unitPrice?: number;
}

export interface RequisitionResponse {
  id: string;
  supplierId: string;
  accepted: boolean;
  comment: string;
  respondedAt: string;
}

export class Requisition {
  id: string;
  minimarketId: string;
  supplierId: string;
  requesterId: string;
  requester: string;
  supplier: string;
  productName: string;
  quantity: number;
  reason: string;
  status: string;
  createdAt: string;
  reviewedAt: string | null;
  rejectionReason: string;
  items: RequisitionItem[];
  response: RequisitionResponse | null;
  shippingOrderId: string | null;

  constructor(resource: Partial<Requisition> & Pick<Requisition, 'id' | 'requester' | 'supplier' | 'productName' | 'quantity' | 'reason' | 'status' | 'createdAt'>) {
    this.id = resource.id;
    this.minimarketId = resource.minimarketId || 'min-1';
    this.supplierId = resource.supplierId || 'sup-2';
    this.requesterId = resource.requesterId || 'usr-admin';
    this.requester = resource.requester;
    this.supplier = resource.supplier;
    this.productName = resource.productName;
    this.quantity = resource.quantity;
    this.reason = resource.reason;
    this.status = resource.status;
    this.createdAt = resource.createdAt;
    this.reviewedAt = resource.reviewedAt || null;
    this.rejectionReason = resource.rejectionReason || '';
    this.items = resource.items?.length ? resource.items : [{ productName: resource.productName, quantity: resource.quantity }];
    this.response = resource.response || null;
    this.shippingOrderId = resource.shippingOrderId || null;
  }

  get canBeReviewed(): boolean {
    return this.status === 'pending';
  }

  get canGenerateShippingOrder(): boolean {
    return this.status === 'accepted' && !this.shippingOrderId;
  }
}
