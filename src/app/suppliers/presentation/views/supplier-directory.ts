import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SuppliersStore } from '../../application/suppliers.store';
import { SearchStore } from '../../../shared/application/search.store';

@Component({
  imports: [TranslatePipe],
  template: `
    <section class="view-page">
      <div class="view-header">
        <div>
          <span>{{ 'page.suppliers.eyebrow' | translate }}</span>
          <h2>{{ 'page.suppliers.title' | translate }}</h2>
          <p>{{ 'page.suppliers.description' | translate }}</p>
        </div>
        <button type="button" class="primary-button" (click)="showSupplierForm.set(true)">{{ 'page.suppliers.newSupplier' | translate }}</button>
      </div>

      @if (showSupplierForm()) {
        <div class="content-card form-panel">
          <form class="entity-form">
            <label>{{ 'page.suppliers.businessName' | translate }}<input placeholder="Anita Gamboa" /></label>
            <div class="form-row"><label>RUC<input placeholder="10456789012" /></label><label>{{ 'page.suppliers.phone' | translate }}<input placeholder="+51 959 404 210" /></label></div>
            <label>{{ 'page.suppliers.email' | translate }}<input placeholder="anitaG@bioandes.pe" /></label>
            <label>{{ 'page.suppliers.address' | translate }}<input placeholder="Cerro Colorado, Arequipa" /></label>
            <div class="form-row"><label>{{ 'page.suppliers.specialty' | translate }}<input placeholder="Lacteos y derivados" /></label><label>{{ 'page.suppliers.coverage' | translate }}<input placeholder="Cerro Colorado - Arequipa" /></label></div>
          </form>
          <div class="action-group"><button class="text-button" (click)="showSupplierForm.set(false)">{{ 'common.cancel' | translate }}</button><button class="primary-button">{{ 'common.save' | translate }}</button></div>
        </div>
      }

      <div class="supplier-grid">
        @for (supplier of filteredSuppliers(); track supplier.id) {
          <article class="grid-card">
            <span>{{ supplier.ruc }}</span>
            <h3>{{ supplier.businessName }}</h3>
            <p>{{ supplier.specialty }}</p>
            <footer><small>{{ supplier.coverageArea }}</small><strong>{{ supplier.phone }}</strong></footer>
          </article>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .form-panel { display: grid; gap: 16px; padding: 22px; }
      .supplier-grid { display: grid; gap: 18px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
      article { padding: 22px; }
      article > span { color: #0d8cfb; font-size: 12px; font-weight: 900; text-transform: uppercase; }
      h3 { color: #021c45; font-weight: 950; margin: 6px 0; }
      p, small { color: #526780; font-weight: 700; }
      footer { align-items: center; display: flex; justify-content: space-between; margin-top: 18px; }
      footer strong { color: #fc6910; }
    `,
  ],
})
export class SupplierDirectory implements OnInit {
  private readonly suppliersStore = inject(SuppliersStore);
  private readonly searchStore = inject(SearchStore);
  readonly showSupplierForm = signal(false);
  readonly filteredSuppliers = computed(() => this.searchStore.filter(this.suppliersStore.suppliers()));

  ngOnInit(): void {
    this.suppliersStore.fetchSuppliers();
  }
}
