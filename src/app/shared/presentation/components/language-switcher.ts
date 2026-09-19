import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  template: `
    <div class="language-switcher" aria-label="Language selector">
      @for (option of options; track option.value) {
        <button type="button" [class.active]="translate.currentLang() === option.value" (click)="setLocale(option.value)">
          {{ option.label }}
        </button>
      }
    </div>
  `,
  styles: [
    `
      .language-switcher {
        background: #eef2f7;
        border-radius: 8px;
        display: inline-flex;
        gap: 4px;
        padding: 4px;
      }

      button {
        background: transparent;
        border: 0;
        border-radius: 6px;
        color: #526780;
        cursor: pointer;
        font-size: 12px;
        font-weight: 800;
        height: 30px;
        min-width: 34px;
      }

      button.active {
        background: #ffffff;
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
        color: #023192;
      }
    `,
  ],
})
export class LanguageSwitcher {
  readonly translate = inject(TranslateService);
  readonly options = [
    { label: 'ES', value: 'es' },
    { label: 'EN', value: 'en' },
  ];

  setLocale(value: string): void {
    this.translate.use(value);
  }
}
