export class InventoryItem {
  id: string;
  productName: string;
  stock: number;
  minimumStock: number;
  lotCode: string;
  expirationDate: string;
  status: string;

  constructor(resource: InventoryItem) {
    this.id = resource.id;
    this.productName = resource.productName;
    this.stock = resource.stock;
    this.minimumStock = resource.minimumStock;
    this.lotCode = resource.lotCode;
    this.expirationDate = resource.expirationDate;
    this.status = resource.status;
  }

  get isLowStock(): boolean {
    return this.stock <= this.minimumStock;
  }
}
