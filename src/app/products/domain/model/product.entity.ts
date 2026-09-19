export class Product {
  id: string;
  name: string;
  description: string;
  category: string;
  expirationDate: string;
  quantity: number;
  price: number;
  available: boolean;

  constructor(resource: Product) {
    this.id = resource.id;
    this.name = resource.name;
    this.description = resource.description;
    this.category = resource.category;
    this.expirationDate = resource.expirationDate;
    this.quantity = resource.quantity;
    this.price = resource.price;
    this.available = resource.available;
  }

  get formattedPrice(): string {
    return `S/ ${this.price.toFixed(2)}`;
  }
}
