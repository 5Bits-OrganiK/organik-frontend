import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { IamStore } from '../../../iam/application/iam.store';
import { ProcurementsStore } from '../../../procurements/application/procurements.store';
import { SearchStore } from '../../../shared/application/search.store';
import { RequisitionStore } from '../../application/requisition.store';
import { Requisition } from '../../domain/model/requisition.entity';

@Component({
  imports: [TranslatePipe],
  template: `
    <section class="view-page">
      <div class="view-header">
        <div><span>{{ 'page.requisition.eyebrow' | translate }}</span><h2>{{ 'page.requisition.title' | translate }}</h2><p>{{ 'page.requisition.description' | translate }}</p></div>
        @if (iamStore.isMinimarketAdmin()) { <button type="button" class="primary-button" (click)="showRequisitionForm.set(true)">{{ 'page.requisition.newRequest' | translate }}</button> }
      </div>
      @if (showRequisitionForm()) {
        <div class="content-card form-panel"><form class="entity-form"><label>{{ 'page.requisition.supplier' | translate }}<input placeholder="Anita Gamboa" /></label><label>{{ 'common.product' | translate }}<input placeholder="Leche organica" /></label><div class="form-row"><label>{{ 'common.quantity' | translate }}<input placeholder="30" /></label><label>{{ 'page.requisition.requester' | translate }}<input placeholder="Albino Caceres" /></label></div><label>{{ 'page.requisition.reason' | translate }}<input placeholder="Reposicion de stock" /></label></form><div class="action-group"><button class="text-button" (click)="showRequisitionForm.set(false)">{{ 'common.cancel' | translate }}</button><button class="primary-button">{{ 'common.save' | translate }}</button></div></div>
      }
      <div class="table-card"><table class="data-table"><thead><tr><th>{{ 'page.requisition.request' | translate }}</th><th>{{ 'common.product' | translate }}</th><th>{{ 'page.requisition.supplier' | translate }}</th><th>{{ 'page.requisition.requester' | translate }}</th><th>{{ 'common.quantity' | translate }}</th><th>{{ 'page.requisition.reason' | translate }}</th><th>{{ 'common.status' | translate }}</th><th>{{ 'common.actions' | translate }}</th></tr></thead><tbody>
        @for (request of filteredRequisitions(); track request.id) {
          <tr><td>{{ request.id }}</td><td>{{ request.productName }}</td><td>{{ request.supplier }}</td><td>{{ request.requester }}</td><td>{{ request.quantity }}</td><td>{{ request.reason }}</td><td><span [class]="'status-badge status-' + request.status">{{ 'status.' + request.status | translate }}</span></td><td><div class="action-group">
            @if (iamStore.isSupplier() && request.canBeReviewed) { <button class="primary-button" (click)="acceptSupplyRequest(request)">{{ 'page.requisition.accept' | translate }}</button><button class="danger-button" (click)="rejectSupplyRequest(request)">{{ 'page.requisition.reject' | translate }}</button> }
            @if (iamStore.isSupplier() && request.canGenerateShippingOrder) { <button class="primary-button" (click)="createShippingOrder(request)">{{ 'page.requisition.createShippingOrder' | translate }}</button> }
            @if (!hasAvailableAction(request)) { <span class="muted-action">{{ 'common.no_actions' | translate }}</span> }
          </div></td></tr>
        }
      </tbody></table></div>
    </section>
  `,
  styles: ['.form-panel{display:grid;gap:16px;padding:22px}.primary-button,.danger-button{min-height:34px;padding:0 12px;font-size:12px}'],
})
export class RequisitionBoard implements OnInit {
  readonly iamStore = inject(IamStore);
  private readonly requisitionStore = inject(RequisitionStore);
  private readonly procurementsStore = inject(ProcurementsStore);
  private readonly searchStore = inject(SearchStore);
  readonly showRequisitionForm = signal(false);
  readonly visibleRequisitions = computed(() => this.requisitionStore.visibleForUser(this.iamStore.currentUser()));
  readonly filteredRequisitions = computed(() => this.searchStore.filter(this.visibleRequisitions()));

  ngOnInit(): void {
    this.requisitionStore.fetchRequisitions();
    this.procurementsStore.fetchOrders();
  }

  acceptSupplyRequest(request: Requisition): void {
    this.requisitionStore.acceptRequest(request.id, this.iamStore.currentSupplierId() || 'sup-2');
  }

  rejectSupplyRequest(request: Requisition): void {
    this.requisitionStore.rejectRequest(request.id);
  }

  createShippingOrder(request: Requisition): void {
    const orderId = this.procurementsStore.createFromSupplyRequest(request);
    this.requisitionStore.linkShippingOrder(request.id, orderId);
  }

  hasAvailableAction(request: Requisition): boolean {
    return this.iamStore.isSupplier() && (request.canBeReviewed || request.canGenerateShippingOrder);
  }
}
