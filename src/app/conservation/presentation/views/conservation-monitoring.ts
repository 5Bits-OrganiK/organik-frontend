import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ConservationStore } from '../../application/conservation.store';
import { SearchStore } from '../../../shared/application/search.store';

@Component({
  imports: [TranslatePipe],
  template: `
    <section class="view-page">
      <div class="view-header">
        <div><span>{{ 'page.conservation.eyebrow' | translate }}</span><h2>{{ 'page.conservation.title' | translate }}</h2><p>{{ 'page.conservation.description' | translate }}</p></div>
        <button type="button" class="primary-button" (click)="router.navigateByUrl('/communication')">{{ 'page.conservation.viewAlerts' | translate }}</button>
      </div>
      <div class="table-card"><table class="data-table"><thead><tr><th>{{ 'page.conservation.zone' | translate }}</th><th>{{ 'common.product' | translate }}</th><th>{{ 'page.conservation.temperature' | translate }}</th><th>{{ 'page.conservation.humidity' | translate }}</th><th>{{ 'page.conservation.record' | translate }}</th><th>{{ 'common.status' | translate }}</th></tr></thead><tbody>
        @for (record of filteredRecords(); track record.id) { <tr><td>{{ record.zone }}</td><td>{{ record.productName }}</td><td>{{ record.temperature }}</td><td>{{ record.humidity }}</td><td>{{ record.recordedAt }}</td><td><span [class]="'status-badge status-' + record.status">{{ 'status.' + record.status | translate }}</span></td></tr> }
      </tbody></table></div>
    </section>
  `,
})
export class ConservationMonitoring implements OnInit {
  readonly router = inject(Router);
  private readonly conservationStore = inject(ConservationStore);
  private readonly searchStore = inject(SearchStore);
  readonly filteredRecords = computed(() => this.searchStore.filter(this.conservationStore.records()));

  ngOnInit(): void {
    this.conservationStore.fetchMonitoring();
  }
}
