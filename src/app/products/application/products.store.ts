import { Injectable, inject, signal } from '@angular/core';
import { ProductsApi } from '../infrastructure/products-api';
import { Product } from '../domain/model/product.entity';

const demoProducts = [
  new Product({ id: 'prod-1', name: 'Tomate organico', description: 'Tomates frescos de cultivo organico.', category: 'Vegetales', expirationDate: '2026-09-28', quantity: 60, price: 3.8, available: true } as Product),
  new Product({ id: 'prod-2', name: 'Lechugas organicas', description: 'Lechugas frescas seleccionadas.', category: 'Vegetales', expirationDate: '2026-09-25', quantity: 42, price: 4.5, available: true } as Product),
  new Product({ id: 'prod-3', name: 'Yogurt organico', description: 'Yogurt artesanal sin preservantes.', category: 'Lacteos', expirationDate: '2026-09-22', quantity: 12, price: 8.9, available: true } as Product),
  new Product({ id: 'prod-4', name: 'Manzanas organicas', description: 'Manzanas dulces de cosecha natural.', category: 'Frutas', expirationDate: '2026-10-05', quantity: 75, price: 5.2, available: true } as Product),
  new Product({ id: 'prod-5', name: 'Pepino organico', description: 'Pepinos frescos para consumo saludable.', category: 'Vegetales', expirationDate: '2026-09-27', quantity: 38, price: 2.9, available: true } as Product),
  new Product({ id: 'prod-6', name: 'Zanahoria organica', description: 'Zanahorias seleccionadas de cultivo natural.', category: 'Vegetales', expirationDate: '2026-10-02', quantity: 54, price: 3.4, available: true } as Product),
  new Product({ id: 'prod-7', name: 'Brocoli organico', description: 'Brocoli fresco rico en nutrientes.', category: 'Vegetales', expirationDate: '2026-09-29', quantity: 31, price: 6.3, available: true } as Product),
  new Product({ id: 'prod-8', name: 'Pimientos organicos', description: 'Pimientos organicos variados.', category: 'Vegetales', expirationDate: '2026-10-01', quantity: 44, price: 5.8, available: true } as Product),
  new Product({ id: 'prod-9', name: 'Queso organico', description: 'Queso fresco de produccion artesanal.', category: 'Lacteos', expirationDate: '2026-09-30', quantity: 20, price: 14.5, available: true } as Product),
  new Product({ id: 'prod-10', name: 'Leche organica', description: 'Leche fresca de proveedor local.', category: 'Lacteos', expirationDate: '2026-09-24', quantity: 36, price: 7.2, available: true } as Product),
];

@Injectable({ providedIn: 'root' })
export class ProductsStore {
  private readonly productsApi = inject(ProductsApi);
  readonly products = signal<Product[]>(demoProducts);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  fetchProducts(): void {
    this.loading.set(true);
    this.productsApi.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar catalogo. Se muestran datos demo.');
        this.products.set(demoProducts);
        this.loading.set(false);
      },
    });
  }
}
