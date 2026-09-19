import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { IamStore } from '../../application/iam.store';
import { SearchStore } from '../../../shared/application/search.store';

@Component({
  imports: [TranslatePipe],
  template: `
    <section class="view-page">
      <div class="view-header">
        <div><span>{{ 'page.iam.eyebrow' | translate }}</span><h2>{{ 'page.iam.title' | translate }}</h2><p>{{ 'page.iam.description' | translate }}</p></div>
        <button type="button" class="primary-button" (click)="showUserForm.set(true)">{{ 'page.iam.newUser' | translate }}</button>
      </div>
      @if (showUserForm()) {
        <div class="content-card form-panel">
          <form class="entity-form">
            <label>{{ 'common.name' | translate }}<input placeholder="Albino Caceres" /></label>
            <label>{{ 'page.iam.email' | translate }}<input placeholder="usuario@organik.pe" /></label>
            <div class="form-row"><label>{{ 'page.iam.role' | translate }}<select><option>Administrador de Minimarket</option><option>Proveedor Organico</option></select></label><label>{{ 'common.status' | translate }}<select><option>active</option><option>inactive</option></select></label></div>
          </form>
          <div class="action-group"><button class="text-button" (click)="showUserForm.set(false)">{{ 'common.cancel' | translate }}</button><button class="primary-button">{{ 'common.save' | translate }}</button></div>
        </div>
      }
      <div class="summary-grid">
        @for (card of summaryCards(); track card.label) {
          <article class="grid-card"><span>{{ card.label | translate }}</span><strong>{{ card.value }}</strong></article>
        }
      </div>
      <div class="table-card">
        <table class="data-table"><thead><tr><th>{{ 'page.iam.user' | translate }}</th><th>{{ 'page.iam.email' | translate }}</th><th>{{ 'page.iam.role' | translate }}</th><th>{{ 'common.status' | translate }}</th></tr></thead>
          <tbody>@for (user of filteredUsers(); track user.id) { <tr><td>{{ user.name }}</td><td>{{ user.email }}</td><td>{{ user.roles[0] }}</td><td><span class="status-badge status-approved">{{ 'status.' + user.status | translate }}</span></td></tr> }</tbody>
        </table>
      </div>
    </section>
  `,
  styles: ['.form-panel{display:grid;gap:16px;padding:22px}.summary-grid{display:grid;gap:14px;grid-template-columns:repeat(3,minmax(0,1fr))}.summary-grid article{display:grid;gap:10px;padding:20px}.summary-grid span{color:#526780;font-size:13px;font-weight:800}.summary-grid strong{color:#021c45;font-size:30px;font-weight:950}'],
})
export class UsersAccess implements OnInit {
  private readonly iamStore = inject(IamStore);
  private readonly searchStore = inject(SearchStore);
  readonly showUserForm = signal(false);
  readonly filteredUsers = computed(() => this.searchStore.filter(this.iamStore.users()));
  readonly summaryCards = computed(() => [
    { label: 'page.iam.activeUsers', value: this.iamStore.users().length },
    { label: 'page.iam.definedRoles', value: 2 },
    { label: 'page.iam.keyPermissions', value: 5 },
  ]);

  ngOnInit(): void {
    this.iamStore.fetchUsers();
  }
}
