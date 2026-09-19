import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CommunicationStore } from '../../application/communication.store';
import { SearchStore } from '../../../shared/application/search.store';

@Component({
  imports: [TranslatePipe],
  template: `
    <section class="view-page">
      <div class="view-header">
        <div><span>{{ 'page.alerts.eyebrow' | translate }}</span><h2>{{ 'page.alerts.title' | translate }}</h2><p>{{ 'page.alerts.description' | translate }}</p></div>
        <div class="action-group"><button type="button" class="secondary-button" (click)="router.navigateByUrl('/suppliers')">{{ 'page.alerts.viewSuppliers' | translate }}</button><button type="button" class="primary-button">{{ communicationStore.unreadCount() }} sin leer</button></div>
      </div>
      <div class="message-list">
        @for (message of filteredMessages(); track message.id) {
          <article class="grid-card" [class.unread]="!message.read">
            <button type="button" class="icon-button" (click)="communicationStore.toggleStarred(message.id)">{{ message.starred ? 'star' : '☆' }}</button>
            <div><strong>{{ message.subject }}</strong><p>{{ message.body }}</p><small>{{ message.sender }} - {{ message.sentAt }}</small></div>
            @if (!message.read) { <button type="button" class="text-button" (click)="communicationStore.markAsRead(message.id)">{{ 'page.alerts.markRead' | translate }}</button> }
          </article>
        }
      </div>
    </section>
  `,
  styles: ['.message-list{display:grid;gap:12px}article{align-items:center;display:flex;gap:16px;padding:18px}article.unread{border-color:#fc6910}strong{color:#021c45;font-weight:950}p,small{color:#526780;display:block;font-weight:700;margin:4px 0 0}article>div{flex:1}'],
})
export class AlertCenter implements OnInit {
  readonly router = inject(Router);
  readonly communicationStore = inject(CommunicationStore);
  private readonly searchStore = inject(SearchStore);
  readonly filteredMessages = computed(() => this.searchStore.filter(this.communicationStore.messages()));

  ngOnInit(): void {
    this.communicationStore.fetchMessages();
  }
}
