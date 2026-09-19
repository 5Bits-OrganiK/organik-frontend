import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AnalyticsStore } from '../../application/analytics.store';
import { SearchStore } from '../../../shared/application/search.store';

@Component({
  imports: [TranslatePipe],
  template: `
    <section class="view-page">
      <div class="view-header">
        <div><span>{{ 'page.analytics.eyebrow' | translate }}</span><h2>{{ 'page.analytics.title' | translate }}</h2><p>{{ 'page.analytics.description' | translate }}</p></div>
        <button type="button" class="primary-button" (click)="generateReport()">{{ reportButtonLabel() }}</button>
      </div>
      <div class="analytics-grid">
        @for (indicator of filteredIndicators(); track indicator.label) {
          <article class="grid-card"><span>{{ indicator.label }}</span><strong>{{ indicator.currentValue }}{{ indicator.unit }}</strong><small [class]="indicator.variation >= 0 ? 'up' : 'down'">{{ indicator.variation >= 0 ? '+' : '' }}{{ indicator.variation }}%</small></article>
        }
      </div>
      <div class="content-card reports-card">
        <h3>{{ 'page.analytics.availableReports' | translate }}</h3>
        <div>
          @for (report of filteredReports(); track report) {
            <button type="button" [class.active]="selectedReport() === report" (click)="selectedReport.set(report)">{{ report }}</button>
          }
        </div>
        @if (generatedReport()) { <p class="report-feedback">{{ generatedReport() }}</p> }
      </div>
      @if (selectedReportSummary(); as summary) {
        <section class="content-card report-detail">
          <div><span class="eyebrow">{{ 'page.analytics.selectedReport' | translate }}</span><h3>{{ summary.title }}</h3><p>{{ summary.description }}</p></div>
          <div class="report-metrics">@for (metric of summary.metrics; track metric.label) { <article class="grid-card"><span>{{ metric.label }}</span><strong>{{ metric.value }}</strong></article> }</div>
          <ul>@for (highlight of summary.highlights; track highlight) { <li>{{ highlight }}</li> }</ul>
        </section>
      }
    </section>
  `,
  styles: [
    `
      .analytics-grid{display:grid;gap:16px;grid-template-columns:repeat(4,minmax(0,1fr))}
      .analytics-grid article{display:grid;gap:10px;padding:22px}.analytics-grid span,.reports-card button{color:#526780;font-weight:850}.analytics-grid strong{color:#021c45;font-size:30px;font-weight:950}.up{color:#023192}.down{color:#b42318}
      .reports-card,.report-detail{display:grid;gap:18px;padding:22px}.reports-card h3,.report-detail h3{color:#021c45;font-weight:950;margin:0}.reports-card div{display:flex;flex-wrap:wrap;gap:10px}.reports-card button{background:#eff3fa;border:1px solid #d9e5f6;border-radius:8px;cursor:pointer;min-height:42px;padding:0 14px}.reports-card button.active{background:#021c45;color:#fff}.report-feedback{color:#023192;font-size:13px;font-weight:900;margin:0}
      .report-metrics{display:grid;gap:14px;grid-template-columns:repeat(3,minmax(0,1fr))}.report-metrics article{box-shadow:none;display:grid;gap:8px;padding:16px}.report-metrics span{color:#526780;font-size:13px;font-weight:850}.report-metrics strong{color:#021c45;font-size:24px;font-weight:950}ul{display:grid;gap:10px;list-style:none;margin:0;padding:0}li{color:#023192;font-weight:750}
    `,
  ],
})
export class AnalyticsSummary implements OnInit {
  private readonly analyticsStore = inject(AnalyticsStore);
  private readonly searchStore = inject(SearchStore);
  private readonly translate = inject(TranslateService);
  readonly selectedReport = signal('Inventario');
  readonly generatedReport = signal('');
  readonly filteredIndicators = computed(() => this.searchStore.filter(this.analyticsStore.indicators()));
  readonly filteredReports = computed(() => this.searchStore.filter(this.analyticsStore.reports().map((report) => ({ report }))).map((item) => item.report));
  readonly selectedReportSummary = computed(() => this.analyticsStore.reportSummaries()[this.selectedReport()]);
  readonly reportButtonLabel = computed(() => this.translate.instant('page.analytics.generate', { report: this.selectedReport() }));

  ngOnInit(): void {
    this.analyticsStore.fetchSummary();
  }

  generateReport(): void {
    this.generatedReport.set(this.translate.instant('page.analytics.generated', { report: this.selectedReport() }));
  }
}
