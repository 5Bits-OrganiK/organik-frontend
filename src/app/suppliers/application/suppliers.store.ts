import { Injectable, inject, signal } from '@angular/core';
import { SuppliersApi } from '../infrastructure/suppliers-api';
import { Supplier } from '../domain/model/supplier.entity';

const demoSuppliers = [
  new Supplier({ id: 'sup-1', businessName: 'BioAndes Organic', ruc: '20600011122', email: 'ventas@bioandes.pe', phone: '+51 955 222 110', address: 'Ruta Agricola 45', specialty: 'Lacteos y vegetales', coverageArea: 'Lima' } as Supplier),
  new Supplier({ id: 'sup-2', businessName: 'Valle Vivo', ruc: '20600033344', email: 'contacto@vallevivo.pe', phone: '+51 944 555 100', address: 'Valle Sagrado 330', specialty: 'Granos organicos', coverageArea: 'Lima y Callao' } as Supplier),
];

@Injectable({ providedIn: 'root' })
export class SuppliersStore {
  private readonly suppliersApi = inject(SuppliersApi);
  readonly suppliers = signal<Supplier[]>(demoSuppliers);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  fetchSuppliers(): void {
    this.loading.set(true);
    this.suppliersApi.getSuppliers().subscribe({
      next: (suppliers) => {
        this.suppliers.set(suppliers);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar proveedores. Se muestran datos demo.');
        this.suppliers.set(demoSuppliers);
        this.loading.set(false);
      },
    });
  }
}
