import { Injectable, computed, inject, signal } from '@angular/core';
import { IamApi } from '../infrastructure/iam-api';
import { User } from '../domain/model/user.entity';

const demoUsers = [
  new User({
    id: 'usr-admin',
    name: 'Albino Caceres',
    email: 'albinoca@organik.pe',
    status: 'active',
    roles: ['Administrador de Minimarket'],
    permissions: ['inventory:write', 'procurements:approve', 'users:manage'],
  }),
  new User({
    id: 'usr-provider',
    name: 'Anita Gamboa',
    email: 'anitaG@bioandes.pe',
    status: 'active',
    roles: ['Proveedor Organico'],
    permissions: ['products:write', 'procurements:track'],
  }),
];

@Injectable({ providedIn: 'root' })
export class IamStore {
  private readonly iamApi = inject(IamApi);
  readonly currentUser = signal<User | null>(demoUsers[0]);
  readonly users = signal<User[]>(demoUsers);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly isAuthenticated = computed(() => Boolean(this.currentUser()));
  readonly userName = computed(() => this.currentUser()?.name || 'Invitado');
  readonly userRole = computed(() => this.currentUser()?.roles?.[0] || 'Sin rol');
  readonly isAdmin = computed(() => this.currentUser()?.permissions?.includes('users:manage') || false);
  readonly isMinimarketAdmin = computed(() => this.currentUser()?.roles?.includes('Administrador de Minimarket') || false);
  readonly isSupplier = computed(() => this.currentUser()?.roles?.includes('Proveedor Organico') || false);
  readonly currentSupplierId = computed(() => (this.isSupplier() ? 'sup-2' : null));
  readonly currentMinimarketId = computed(() => (this.isMinimarketAdmin() ? 'min-1' : 'min-1'));

  fetchUsers(): void {
    this.loading.set(true);
    this.error.set(null);
    this.iamApi.getUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar usuarios desde la API. Se muestran datos demo.');
        this.users.set(demoUsers);
        this.loading.set(false);
      },
    });
  }

  logout(): void {
    window.localStorage.removeItem('marketgo.auth.token');
    this.currentUser.set(null);
  }

  switchDemoUser(userId: string): void {
    const nextUser = this.users().find((user) => user.id === userId);
    if (nextUser) this.currentUser.set(nextUser);
  }
}
