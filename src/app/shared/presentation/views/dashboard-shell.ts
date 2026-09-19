import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { IamStore } from '../../../iam/application/iam.store';
import { ProcurementsStore } from '../../../procurements/application/procurements.store';
import { RequisitionStore } from '../../../requisition/application/requisition.store';
import { DashboardOverviewStore } from '../../application/dashboard-overview.store';
import { SearchStore } from '../../application/search.store';

@Component({
  imports: [TranslatePipe],
  template: `
    <div class="dashboard-grid">
      <section class="metric-card hero-card">
        <div>
          <span class="eyebrow">{{ 'page.dashboard.eyebrow' | translate }}</span>
          <h2>{{ 'page.dashboard.title' | translate }}</h2>
          <p>{{ roleDescription() }}</p>
        </div>
        <div class="hero-stat">
          <strong>{{ overviewStore.healthScore() }}%</strong>
          <span>{{ 'page.dashboard.health' | translate }}</span>
        </div>
      </section>

      @for (metric of filteredIndicators(); track metric.label) {
        <button type="button" class="metric-card compact" (click)="goToMetric(metric.route)">
          <span>{{ metric.label }}</span>
          <strong>{{ metric.value }}</strong>
          <small>{{ metric.detail }}</small>
        </button>
      }

      <section class="content-card activity-card">
        <div class="section-header">
          <h2>{{ 'page.dashboard.activity' | translate }}</h2>
          <button type="button" class="secondary-button" (click)="router.navigateByUrl('/communication')">{{ 'common.view_all' | translate }}</button>
        </div>
        <div class="timeline">
          @for (event of filteredActivity(); track event.title) {
            <article>
              <span [class]="'status-dot ' + event.kind"></span>
              <div>
                <strong>{{ event.title }}</strong>
                <p>{{ event.detail }}</p>
              </div>
              <time>{{ event.time }}</time>
            </article>
          }
        </div>
      </section>

      <section class="content-card modules-card">
        <div class="section-header">
          <h2>{{ 'page.dashboard.summary' | translate }}</h2>
        </div>
        <div class="module-list">
          @for (module of filteredModules(); track module.name) {
            <button type="button" class="module-action" (click)="goToMetric(module.route)">
              <span class="module-icon">
                <i [class]="module.icon"></i>
              </span>
              <div>
                <strong>{{ module.name }}</strong>
                <span>{{ module.description }}</span>
              </div>
            </button>
          }
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .dashboard-grid {
        display: grid;
        gap: 18px;
        grid-template-columns: repeat(12, minmax(0, 1fr));
      }

      .metric-card {
        background: #ffffff;
        border: 1px solid #d9e5f6;
        border-radius: 8px;
        box-shadow: 0 12px 26px rgba(15, 23, 42, 0.05);
      }

      .hero-card {
        align-items: center;
        display: flex;
        grid-column: span 6;
        justify-content: space-between;
        min-height: 220px;
        padding: 28px;
      }

      .hero-card h2 {
        color: #021c45;
        font-size: 30px;
        line-height: 1.08;
        margin: 0;
        max-width: 390px;
      }

      .hero-card p {
        color: #526780;
        font-size: 14px;
        font-weight: 650;
        line-height: 1.6;
        margin: 16px 0 0;
        max-width: 430px;
      }

      .hero-stat {
        align-items: center;
        background: #021c45;
        border-radius: 8px;
        color: #ffffff;
        display: flex;
        flex-direction: column;
        height: 132px;
        justify-content: center;
        min-width: 132px;
      }

      .hero-stat strong {
        color: #fc6910;
        font-size: 34px;
        font-weight: 950;
      }

      .compact {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        grid-column: span 2;
        min-height: 220px;
        padding: 22px;
        text-align: left;
      }

      .compact span,
      .compact small {
        color: #526780;
        font-weight: 800;
      }

      .compact strong {
        color: #021c45;
        font-size: 32px;
        font-weight: 950;
        margin-top: auto;
      }

      .activity-card {
        grid-column: span 7;
        padding: 22px;
      }

      .modules-card {
        grid-column: span 5;
        padding: 22px;
      }

      .section-header {
        align-items: center;
        display: flex;
        justify-content: space-between;
        margin-bottom: 18px;
      }

      .section-header h2 {
        color: #021c45;
        font-size: 18px;
        font-weight: 900;
        margin: 0;
      }

      .timeline,
      .module-list {
        display: grid;
        gap: 12px;
      }

      .timeline article,
      .module-action {
        align-items: center;
        background: #eff3fa;
        border: 1px solid #d9e5f6;
        border-radius: 8px;
        color: inherit;
        cursor: pointer;
        display: flex;
        gap: 14px;
        min-height: 70px;
        padding: 14px;
        text-align: left;
        width: 100%;
      }

      .timeline strong,
      .module-action strong {
        color: #021c45;
        display: block;
        font-size: 14px;
        font-weight: 900;
      }

      .timeline p,
      .module-action span {
        color: #526780;
        display: block;
        font-size: 12px;
        font-weight: 700;
        margin: 4px 0 0;
      }

      .timeline time {
        color: #526780;
        font-size: 12px;
        font-weight: 900;
        margin-left: auto;
      }

      .status-dot {
        border-radius: 50%;
        flex: 0 0 12px;
        height: 12px;
        width: 12px;
      }

      .warning {
        background: #fc6910;
      }

      .success,
      .info {
        background: #0d8cfb;
      }

      .module-icon {
        align-items: center;
        background: #021c45;
        border-radius: 8px;
        color: #ffffff !important;
        display: inline-flex !important;
        height: 42px;
        justify-content: center;
        margin: 0 !important;
        width: 42px;
      }

      .module-icon .pi {
        color: currentColor;
        font-size: 16px;
      }

      @media (max-width: 1100px) {
        .hero-card,
        .compact,
        .activity-card,
        .modules-card {
          grid-column: span 12;
        }
      }
    `,
  ],
})
export class DashboardShell implements OnInit {
  readonly router = inject(Router);
  readonly overviewStore = inject(DashboardOverviewStore);
  private readonly iamStore = inject(IamStore);
  private readonly requisitionStore = inject(RequisitionStore);
  private readonly procurementsStore = inject(ProcurementsStore);
  private readonly searchStore = inject(SearchStore);
  private readonly translate = inject(TranslateService);

  readonly roleIndicators = computed(() =>
    this.iamStore.isSupplier()
      ? [
          { label: this.translate.instant('dashboardRole.requests'), value: this.requisitionStore.visibleForUser(this.iamStore.currentUser()).filter((request) => request.status === 'pending').length, detail: this.translate.instant('dashboardRole.toReview'), route: '/requisition' },
          { label: this.translate.instant('dashboardRole.orders'), value: this.procurementsStore.visibleForUser(this.iamStore.currentUser()).length, detail: this.translate.instant('dashboardRole.shippingOrders'), route: '/procurements' },
          { label: this.translate.instant('dashboardRole.catalog'), value: '10', detail: this.translate.instant('dashboardRole.organicProducts'), route: '/products' },
        ]
      : [
          { label: this.translate.instant('dashboardRole.inventory'), value: '1,248', detail: this.translate.instant('dashboardRole.availableUnits'), route: '/inventory' },
          { label: this.translate.instant('dashboardRole.requests'), value: this.requisitionStore.visibleForUser(this.iamStore.currentUser()).length, detail: this.translate.instant('dashboardRole.createdByMinimarket'), route: '/requisition' },
          { label: this.translate.instant('dashboardRole.shipments'), value: this.procurementsStore.visibleForUser(this.iamStore.currentUser()).filter((order) => order.status === 'pending-reception').length, detail: this.translate.instant('dashboardRole.pendingReception'), route: '/procurements' },
        ],
  );
  readonly modules = computed(() =>
    this.iamStore.isSupplier()
      ? [
          { name: this.translate.instant('dashboardRole.receivedRequests'), description: this.translate.instant('dashboardRole.receivedRequestsDetail'), icon: 'pi pi-list-check', route: '/requisition' },
          { name: this.translate.instant('dashboardRole.shippingOrdersModule'), description: this.translate.instant('dashboardRole.shippingOrdersDetail'), icon: 'pi pi-truck', route: '/procurements' },
          { name: this.translate.instant('dashboardRole.supplierProfile'), description: this.translate.instant('dashboardRole.supplierProfileDetail'), icon: 'pi pi-id-card', route: '/profiles' },
        ]
      : [
          { name: this.translate.instant('dashboardRole.inventory'), description: this.translate.instant('dashboardRole.inventoryDetail'), icon: 'pi pi-box', route: '/inventory' },
          { name: this.translate.instant('dashboardRole.supplyRequests'), description: this.translate.instant('dashboardRole.supplyRequestsDetail'), icon: 'pi pi-list-check', route: '/requisition' },
          { name: this.translate.instant('dashboardRole.shipmentReception'), description: this.translate.instant('dashboardRole.shipmentReceptionDetail'), icon: 'pi pi-truck', route: '/procurements' },
        ],
  );
  readonly roleDescription = computed(() =>
    this.iamStore.isSupplier()
      ? this.translate.instant('dashboardRole.supplierDescription')
      : this.translate.instant('dashboardRole.adminDescription'),
  );
  readonly filteredIndicators = computed(() => this.searchStore.filter(this.roleIndicators()));
  readonly filteredActivity = computed(() => this.searchStore.filter(this.overviewStore.activity()));
  readonly filteredModules = computed(() => this.searchStore.filter(this.modules()));

  ngOnInit(): void {
    this.overviewStore.fetchOverview();
    this.requisitionStore.fetchRequisitions();
    this.procurementsStore.fetchOrders();
  }

  goToMetric(route: string): void {
    this.router.navigateByUrl(route);
  }
}
