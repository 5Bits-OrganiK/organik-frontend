import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { InventoryStore } from '../../application/inventory.store';
import { SearchStore } from '../../../shared/application/search.store';

@Component({
  imports: [TranslatePipe],
  template: `
    <section class="view-page">
      <div class="view-header">
        <div>
          <span>{{ 'page.inventory.eyebrow' | translate }}</span>
          <h2>{{ 'page.inventory.title' | translate }}</h2>
          <p>{{ 'page.inventory.description' | translate }}</p>
        </div>
        <button type="button" class="primary-button" (click)="showStockForm.set(true)">{{ 'page.inventory.registerStock' | translate }}</button>
      </div>

      @if (showStockForm()) {
        <div class="content-card form-panel">
          <form class="entity-form">
            <label>{{ 'common.product' | translate }}<input placeholder="Tomate organico" /></label>
            <div class="form-row">
              <label>{{ 'page.inventory.lot' | translate }}<input placeholder="LOT-025" /></label>
              <label>{{ 'common.expiration' | translate }}<input placeholder="2026-10-01" /></label>
            </div>
            <div class="form-row">
              <label>Stock<input placeholder="50" /></label>
              <label>{{ 'page.inventory.minimumStock' | translate }}<input placeholder="20" /></label>
            </div>
          </form>
          <div class="action-group">
            <button type="button" class="text-button" (click)="showStockForm.set(false)">{{ 'common.cancel' | translate }}</button>
            <button type="button" class="primary-button">{{ 'common.save' | translate }}</button>
          </div>
        </div>
      }

      <div class="table-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>{{ 'common.product' | translate }}</th>
              <th>{{ 'page.inventory.lot' | translate }}</th>
              <th>{{ 'common.stock' | translate }}</th>
              <th>{{ 'page.inventory.minimumStock' | translate }}</th>
              <th>{{ 'common.expiration' | translate }}</th>
              <th>{{ 'common.status' | translate }}</th>
            </tr>
          </thead>
          <tbody>
            @for (item of filteredItems(); track item.id) {
              <tr>
                <td>{{ item.productName }}</td>
                <td>{{ item.lotCode }}</td>
                <td>{{ item.stock }}</td>
                <td>{{ item.minimumStock }}</td>
                <td>{{ item.expirationDate }}</td>
                <td><span [class]="'status-badge status-' + item.status">{{ 'status.' + item.status | translate }}</span></td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: ['.form-panel { display: grid; gap: 16px; padding: 22px; }'],
})
export class InventoryControl implements OnInit {
  private readonly inventoryStore = inject(InventoryStore);
  private readonly searchStore = inject(SearchStore);
  readonly showStockForm = signal(false);
  readonly filteredItems = computed(() => this.searchStore.filter(this.inventoryStore.items()));

  ngOnInit(): void {
    this.inventoryStore.fetchInventory();
  }
}
