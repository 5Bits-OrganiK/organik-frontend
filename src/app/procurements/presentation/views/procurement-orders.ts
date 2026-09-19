import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { IamStore } from '../../../iam/application/iam.store';
import { InventoryStore } from '../../../inventory/application/inventory.store';
import { SearchStore } from '../../../shared/application/search.store';
import { ProcurementsStore } from '../../application/procurements.store';
import { ProcurementOrder } from '../../domain/model/procurement-order.entity';

@Component({
  imports: [TranslatePipe],
  template: `
    <section class="view-page">
      <div class="view-header">
        <div><span>{{ 'page.procurements.eyebrow' | translate }}</span><h2>{{ 'page.procurements.title' | translate }}</h2><p>{{ 'page.procurements.description' | translate }}</p></div>
        @if (iamStore.isSupplier()) { <button type="button" class="primary-button" (click)="showOrderForm.set(true)">{{ 'page.procurements.createOrder' | translate }}</button> }
      </div>
      @if (showOrderForm()) {
        <div class="content-card form-panel"><form class="entity-form"><label>{{ 'page.procurements.supplier' | translate }}<input placeholder="Anita Gamboa" /></label><label>{{ 'common.minimarket' | translate }}<input placeholder="Minimarket Verde Sur" /></label><label>{{ 'option.products' | translate }}<input placeholder="Leche organica, Queso organico" /></label><div class="form-row"><label>{{ 'page.procurements.estimatedTotal' | translate }}<input placeholder="315.80" /></label><label>{{ 'common.status' | translate }}<select><option>pending-reception</option><option>received</option><option>rejected</option></select></label></div></form><div class="action-group"><button class="text-button" (click)="showOrderForm.set(false)">{{ 'common.cancel' | translate }}</button><button class="primary-button">{{ 'common.save' | translate }}</button></div></div>
      }
      <div class="table-card"><table class="data-table"><thead><tr><th>{{ 'page.procurements.order' | translate }}</th><th>{{ 'page.procurements.supplier' | translate }}</th><th>{{ 'common.minimarket' | translate }}</th><th>{{ 'common.items' | translate }}</th><th>{{ 'page.procurements.shippingDate' | translate }}</th><th>{{ 'common.total' | translate }}</th><th>{{ 'common.status' | translate }}</th><th>{{ 'common.actions' | translate }}</th></tr></thead><tbody>
        @for (order of filteredOrders(); track order.id) {
          <tr><td>{{ order.id }}</td><td>{{ order.supplier }}</td><td>{{ order.minimarket }}</td><td>{{ order.itemCount }}</td><td>{{ order.shippingDate }}</td><td>{{ order.total }}</td><td><span [class]="'status-badge status-' + order.status">{{ 'status.' + order.status | translate }}</span></td><td><div class="action-group">
            @if (iamStore.isMinimarketAdmin() && order.canBeReviewed) { <button class="primary-button" (click)="acceptReception(order)">{{ 'page.procurements.acceptReception' | translate }}</button><button class="danger-button" (click)="procurementsStore.rejectReception(order.id)">{{ 'page.procurements.rejectReception' | translate }}</button> }
            @if (!(iamStore.isMinimarketAdmin() && order.canBeReviewed)) { <span class="muted-action">{{ 'common.no_actions' | translate }}</span> }
          </div></td></tr>
        }
      </tbody></table></div>
    </section>
  `,
  styles: ['.form-panel{display:grid;gap:16px;padding:22px}.primary-button,.danger-button{min-height:34px;padding:0 12px;font-size:12px}'],
})
export class ProcurementOrders implements OnInit {
  readonly iamStore = inject(IamStore);
  readonly procurementsStore = inject(ProcurementsStore);
  private readonly inventoryStore = inject(InventoryStore);
  private readonly searchStore = inject(SearchStore);
  readonly showOrderForm = signal(false);
  readonly visibleOrders = computed(() => this.procurementsStore.visibleForUser(this.iamStore.currentUser()));
  readonly filteredOrders = computed(() => this.searchStore.filter(this.visibleOrders()));

  ngOnInit(): void {
    this.procurementsStore.fetchOrders();
    this.inventoryStore.fetchInventory();
  }

  acceptReception(order: ProcurementOrder): void {
    this.procurementsStore.acceptReception(order.id);
    this.inventoryStore.receiveShipmentItems(order.items);
  }
}
