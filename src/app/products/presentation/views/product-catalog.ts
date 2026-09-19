import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductsStore } from '../../application/products.store';
import { SearchStore } from '../../../shared/application/search.store';

@Component({
  imports: [TranslatePipe],
  template: `
    <section class="view-page">
      <div class="view-header">
        <div>
          <span>{{ 'page.products.eyebrow' | translate }}</span>
          <h2>{{ 'page.products.title' | translate }}</h2>
          <p>{{ 'page.products.description' | translate }}</p>
        </div>
        <button type="button" class="primary-button" (click)="showProductForm.set(true)">{{ 'page.products.newProduct' | translate }}</button>
      </div>

      @if (showProductForm()) {
        <div class="content-card form-panel">
          <form class="entity-form">
            <label>{{ 'common.name' | translate }}<input placeholder="Tomate organico" /></label>
            <label>{{ 'common.category' | translate }}<select><option>Vegetales</option><option>Frutas</option><option>Lacteos</option></select></label>
            <label>{{ 'common.expiration' | translate }}<input placeholder="2026-10-01" /></label>
            <div class="form-row">
              <label>{{ 'common.quantity' | translate }}<input placeholder="40" /></label>
              <label>{{ 'common.price' | translate }}<input placeholder="5.80" /></label>
            </div>
            <label>{{ 'common.description' | translate }}<input placeholder="Producto organico fresco" /></label>
          </form>
          <div class="action-group">
            <button type="button" class="text-button" (click)="showProductForm.set(false)">{{ 'common.cancel' | translate }}</button>
            <button type="button" class="primary-button">{{ 'common.save' | translate }}</button>
          </div>
        </div>
      }

      <div class="products-grid">
        @for (product of filteredProducts(); track product.id) {
          <article class="grid-card">
            <div class="card-top">
              <span>{{ product.category }}</span>
              <strong>{{ product.formattedPrice }}</strong>
            </div>
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <footer>
              <small>{{ product.quantity }} {{ 'page.products.units' | translate }}</small>
              <span [class]="product.available ? 'status-badge status-approved' : 'status-badge status-rejected'">
                {{ product.available ? ('page.products.available' | translate) : ('page.products.unavailable' | translate) }}
              </span>
            </footer>
          </article>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .form-panel { display: grid; gap: 16px; padding: 22px; }
      .products-grid { display: grid; gap: 18px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
      article { display: grid; gap: 12px; padding: 22px; }
      .card-top, footer { align-items: center; display: flex; justify-content: space-between; }
      .card-top span { color: #0d8cfb; font-size: 12px; font-weight: 900; text-transform: uppercase; }
      .card-top strong, footer strong { color: #fc6910; font-size: 18px; font-weight: 950; }
      h3 { color: #021c45; font-weight: 950; margin: 6px 0; }
      p, small { color: #526780; font-weight: 700; margin: 0; }
      @media (max-width: 900px) { .products-grid { grid-template-columns: 1fr; } }
    `,
  ],
})
export class ProductCatalog implements OnInit {
  private readonly productsStore = inject(ProductsStore);
  private readonly searchStore = inject(SearchStore);
  readonly showProductForm = signal(false);
  readonly filteredProducts = computed(() => this.searchStore.filter(this.productsStore.products()));

  ngOnInit(): void {
    this.productsStore.fetchProducts();
  }
}
