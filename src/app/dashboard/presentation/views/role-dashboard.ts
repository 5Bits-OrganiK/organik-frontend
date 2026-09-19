import { Component, computed, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { DashboardStore } from '../../application/dashboard.store';
import { SearchStore } from '../../../shared/application/search.store';

@Component({
  imports: [TranslatePipe],
  template: `
    <section class="view-page">
      <div class="view-header">
        <div><span>{{ 'page.roleDashboard.eyebrow' | translate }}</span><h2>{{ 'page.roleDashboard.title' | translate }}</h2><p>{{ 'page.roleDashboard.description' | translate }}</p></div>
        <button type="button" class="primary-button" (click)="dashboardStore.fetchIndicators()">{{ 'page.roleDashboard.refresh' | translate }}</button>
      </div>
      <div class="indicator-grid">
        @for (indicator of filteredIndicators(); track indicator.type) {
          <article class="grid-card"><span>{{ indicator.title }}</span><strong>{{ indicator.value }}</strong><small [class]="indicator.variation >= 0 ? 'up' : 'down'">{{ indicator.variation >= 0 ? '+' : '' }}{{ indicator.variation }}% {{ 'page.roleDashboard.periodComparison' | translate }}</small></article>
        }
      </div>
    </section>
  `,
  styles: ['.indicator-grid{display:grid;gap:16px;grid-template-columns:repeat(4,minmax(0,1fr))}article{display:grid;gap:10px;min-height:150px;padding:22px}span{color:#526780;font-size:13px;font-weight:850}strong{color:#021c45;font-size:34px;font-weight:950}.up{color:#023192}.down{color:#b42318}'],
})
export class RoleDashboard implements OnInit {
  readonly dashboardStore = inject(DashboardStore);
  private readonly searchStore = inject(SearchStore);
  readonly filteredIndicators = computed(() => this.searchStore.filter(this.dashboardStore.indicators()));

  ngOnInit(): void {
    this.dashboardStore.fetchIndicators();
  }
}
