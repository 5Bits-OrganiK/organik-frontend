import { Component, inject, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  template: `
    <section class="view-page">
      <div class="view-header">
        <div>
          <span>{{ 'page.settings.eyebrow' | translate }}</span>
          <h2>{{ 'page.settings.title' | translate }}</h2>
          <p>{{ 'page.settings.description' | translate }}</p>
        </div>
        <button type="button" class="primary-button" (click)="saveSettings()">{{ 'page.settings.saveChanges' | translate }}</button>
      </div>

      <div class="settings-grid">
        @for (card of cards; track card.key) {
          <article class="grid-card">
            <strong>{{ card.key | translate }}</strong>
            <p>{{ card.value }}</p>
          </article>
        }
      </div>

      @if (savedMessage()) {
        <p class="content-card saved-message">{{ savedMessage() }}</p>
      }
    </section>
  `,
  styles: [
    `
      .settings-grid {
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      article,
      .saved-message {
        padding: 22px;
      }

      strong {
        color: #021c45;
        display: block;
        font-weight: 950;
        margin-bottom: 4px;
      }

      p {
        color: #526780;
        font-weight: 700;
        margin: 0;
      }

      .saved-message {
        color: #023192;
        font-weight: 900;
      }
    `,
  ],
})
export class Settings {
  private readonly translate = inject(TranslateService);
  readonly savedMessage = signal('');
  readonly cards = [
    { key: 'page.settings.language', value: 'ES - Espanol' },
    { key: 'page.settings.theme', value: this.translate.instant('page.settings.lightTheme') },
    { key: 'page.settings.notifications', value: this.translate.instant('page.settings.notificationsDetail') },
    { key: 'page.settings.session', value: this.translate.instant('page.settings.sessionDetail') },
  ];

  saveSettings(): void {
    this.savedMessage.set(this.translate.instant('page.settings.saved'));
  }
}
