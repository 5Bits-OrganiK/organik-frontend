import { Injectable, inject, signal } from '@angular/core';
import { ProfilesApi } from '../infrastructure/profiles-api';
import { Profile } from '../domain/model/profile.entity';

const demoProfiles = [
  new Profile({ id: 'prof-market', userId: 'usr-admin', type: 'minimarket', businessName: 'Minimarket Verde Sur', phone: '+51 987 654 321', address: 'Av. Los Alimentos 120', district: 'Surco' } as Profile),
  new Profile({ id: 'prof-provider', userId: 'usr-provider', type: 'provider', businessName: 'BioAndes Organic', phone: '+51 955 222 110', address: 'Ruta Agricola 45', specialty: 'Lacteos y vegetales organicos', coverageArea: 'Lima Metropolitana' } as Profile),
];

@Injectable({ providedIn: 'root' })
export class ProfilesStore {
  private readonly profilesApi = inject(ProfilesApi);
  readonly profiles = signal<Profile[]>(demoProfiles);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  fetchProfiles(): void {
    this.loading.set(true);
    this.error.set(null);
    this.profilesApi.getProfiles().subscribe({
      next: (profiles) => {
        this.profiles.set(profiles);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo conectar con perfiles. Se muestran datos demo.');
        this.profiles.set(demoProfiles);
        this.loading.set(false);
      },
    });
  }
}
