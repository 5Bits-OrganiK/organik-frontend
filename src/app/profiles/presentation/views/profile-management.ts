import { Component, computed, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProfilesStore } from '../../application/profiles.store';
import { SearchStore } from '../../../shared/application/search.store';

@Component({
  imports: [TranslatePipe],
  template: `
    <section class="view-page">
      <div class="view-header">
        <div><span>{{ 'page.profiles.eyebrow' | translate }}</span><h2>{{ 'page.profiles.title' | translate }}</h2><p>{{ 'page.profiles.description' | translate }}</p></div>
        <button type="button" class="primary-button">{{ 'page.profiles.updateProfile' | translate }}</button>
      </div>
      <div class="profiles-grid">
        @for (profile of filteredProfiles(); track profile.id) {
          <article class="grid-card">
            <div class="profile-type">{{ profile.type }}</div>
            <h3>{{ profile.businessName }}</h3>
            <p>{{ profile.address }}</p>
            <dl>
              <div><dt>{{ 'page.profiles.phone' | translate }}</dt><dd>{{ profile.phone }}</dd></div>
              <div><dt>{{ 'page.profiles.zone' | translate }}</dt><dd>{{ profile.displayArea }}</dd></div>
              @if (profile.specialty) { <div><dt>{{ 'page.profiles.specialty' | translate }}</dt><dd>{{ profile.specialty }}</dd></div> }
            </dl>
          </article>
        }
      </div>
    </section>
  `,
  styles: ['.profiles-grid{display:grid;gap:18px;grid-template-columns:repeat(2,minmax(0,1fr))}article{padding:24px}.profile-type{color:#0d8cfb;font-size:12px;font-weight:900;text-transform:uppercase}h3{color:#021c45;font-weight:950;margin:6px 0}p,dd{color:#526780;font-weight:700}dl{display:grid;gap:12px;margin:20px 0 0}dt{color:#526780;font-size:12px;font-weight:900}dd{margin:4px 0 0}'],
})
export class ProfileManagement implements OnInit {
  private readonly profilesStore = inject(ProfilesStore);
  private readonly searchStore = inject(SearchStore);
  readonly filteredProfiles = computed(() => this.searchStore.filter(this.profilesStore.profiles()));

  ngOnInit(): void {
    this.profilesStore.fetchProfiles();
  }
}
