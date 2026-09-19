import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [RouterLink, TranslatePipe],
  template: `
    <section class="content-card denied">
      <span class="eyebrow">{{ 'page.accessDenied.title' | translate }}</span>
      <h2>{{ 'page.accessDenied.title' | translate }}</h2>
      <p>{{ 'page.accessDenied.description' | translate }}</p>
      <a class="primary-button" routerLink="/home">{{ 'page.accessDenied.backHome' | translate }}</a>
    </section>
  `,
  styles: [
    `
      .denied {
        display: grid;
        gap: 16px;
        padding: 28px;
      }

      h2 {
        color: #021c45;
        margin: 0;
      }

      p {
        color: #526780;
        font-weight: 700;
        margin: 0;
      }

      a {
        text-decoration: none;
        width: max-content;
      }
    `,
  ],
})
export class AccessDenied {}
