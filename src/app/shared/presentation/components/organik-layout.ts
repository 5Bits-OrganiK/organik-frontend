import { Component, computed, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { IamStore } from '../../../iam/application/iam.store';
import { SearchStore } from '../../application/search.store';
import { LanguageSwitcher } from './language-switcher';

interface MenuItem {
  to: string;
  icon: string;
  labelKey: string;
  roles: string[];
}

@Component({
  selector: 'app-organik-layout',
  imports: [FormsModule, RouterLink, RouterLinkActive, RouterOutlet, TranslatePipe, LanguageSwitcher],
  template: `
    <div class="organik-layout">
      <aside class="sidebar">
        <div>
          <a routerLink="/home" class="brand">
            <span class="brand-mark">OK</span>
            <span>
              <strong>{{ 'app.name' | translate }}</strong>
              <small>{{ 'app.tagline' | translate }}</small>
            </span>
          </a>

          <nav class="menu" aria-label="OrganiK navigation">
            @for (item of visibleMenuItems(); track item.to) {
              <a [routerLink]="item.to" routerLinkActive="active" class="menu-item">
                <i [class]="item.icon"></i>
                <span>{{ item.labelKey | translate }}</span>
              </a>
            }
          </nav>
        </div>

        <div class="sidebar-footer">
          <label class="role-switcher">
            <span>{{ 'common.current_role' | translate }}</span>
            <select [ngModel]="iamStore.currentUser()?.id" (ngModelChange)="iamStore.switchDemoUser($event)">
              @for (user of iamStore.users(); track user.id) {
                <option [value]="user.id">{{ user.roles[0] }}</option>
              }
            </select>
          </label>
          <button type="button" class="logout-button" (click)="iamStore.logout()">
            <i class="pi pi-sign-out"></i>
            <span>{{ 'option.logout' | translate }}</span>
          </button>
          <button type="button" class="profile-button" (click)="router.navigateByUrl('/settings')">
            <span class="avatar">{{ userInitials() }}</span>
            <span>
              <strong>{{ iamStore.userName() }}</strong>
              <small>{{ iamStore.userRole() }}</small>
            </span>
            <span class="ellipsis">...</span>
          </button>
        </div>
      </aside>

      <div class="workspace">
        <header class="topbar">
          <div>
            <h1>{{ pageTitle() }}</h1>
            <p>{{ todayDate() }}</p>
          </div>

          <div class="topbar-actions">
            <div class="search-box">
              <i class="pi pi-search"></i>
              <input
                [ngModel]="searchStore.query()"
                (ngModelChange)="searchStore.setQuery($event)"
                [placeholder]="'common.search_placeholder' | translate"
                type="search"
              />
            </div>
            <button type="button" class="icon-button" aria-label="Notifications" (click)="router.navigateByUrl('/communication')">
              <i class="pi pi-bell"></i>
              <span class="notification-dot"></span>
            </button>
            <app-language-switcher />
          </div>
        </header>

        <main class="content">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [
    `
      .organik-layout {
        background: #eff3fa;
        display: flex;
        min-height: 100vh;
      }

      .sidebar {
        align-self: stretch;
        background: #021c45;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 10px;
        padding: 18px 0;
        width: 300px;
      }

      .brand {
        align-items: center;
        color: #ffffff;
        display: flex;
        gap: 12px;
        padding: 10px 22px 24px;
        text-decoration: none;
      }

      .brand-mark {
        align-items: center;
        background: #ffffff;
        border-radius: 8px;
        color: #023192;
        display: inline-flex;
        flex: 0 0 46px;
        font-weight: 950;
        height: 46px;
        justify-content: center;
        width: 46px;
      }

      .brand strong,
      .profile-button strong {
        display: block;
        font-size: 15px;
      }

      .brand small,
      .profile-button small {
        color: #b8c9e8;
        display: block;
        font-size: 11px;
        font-weight: 700;
        margin-top: 2px;
      }

      .menu,
      .sidebar-footer {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .menu-item {
        align-items: center;
        border-radius: 8px;
        color: #b8c9e8;
        display: flex;
        font-size: 14px;
        font-weight: 800;
        gap: 14px;
        margin: 0 14px;
        min-height: 44px;
        padding: 0 18px;
        text-decoration: none;
      }

      .menu-item:hover,
      .menu-item.active {
        background: #0d8cfb;
        color: #ffffff;
      }

      .menu-item .pi {
        color: currentColor;
        font-size: 16px;
        width: 20px;
      }

      .sidebar-footer {
        gap: 12px;
        padding: 0 14px;
      }

      .role-switcher {
        color: #b8c9e8;
        display: grid;
        font-size: 11px;
        font-weight: 800;
        gap: 6px;
        text-transform: uppercase;
      }

      .role-switcher select {
        background: #ffffff;
        border: 1px solid #d9e5f6;
        border-radius: 8px;
        color: #023192;
        min-height: 40px;
        padding: 0 10px;
        text-transform: none;
      }

      .logout-button,
      .profile-button {
        align-items: center;
        border: 0;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        gap: 12px;
        min-height: 48px;
        padding: 10px 14px;
        text-align: left;
        width: 100%;
      }

      .logout-button {
        background: #023192;
        color: #eff3fa;
        font-weight: 800;
      }

      .profile-button {
        background: rgba(255, 255, 255, 0.06);
        color: #ffffff;
      }

      .avatar {
        align-items: center;
        background: #0d8cfb;
        border-radius: 50%;
        display: inline-flex;
        flex: 0 0 38px;
        font-size: 13px;
        font-weight: 900;
        height: 38px;
        justify-content: center;
      }

      .ellipsis {
        margin-left: auto;
      }

      .workspace {
        display: flex;
        flex: 1;
        flex-direction: column;
        min-width: 0;
      }

      .topbar {
        align-items: center;
        display: flex;
        justify-content: space-between;
        min-height: 86px;
        padding: 24px 40px 16px;
      }

      .topbar h1 {
        color: #021c45;
        font-size: 26px;
        font-weight: 900;
        line-height: 1.1;
        margin: 0;
      }

      .topbar p {
        color: #526780;
        font-size: 13px;
        font-weight: 700;
        margin: 6px 0 0;
      }

      .topbar-actions {
        align-items: center;
        display: flex;
        gap: 14px;
      }

      .search-box {
        align-items: center;
        background: #ffffff;
        border: 1px solid #d9e5f6;
        border-radius: 8px;
        box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
        display: flex;
        gap: 10px;
        height: 46px;
        padding: 0 14px;
        width: 310px;
      }

      .search-box .pi,
      .icon-button .pi {
        color: #526780;
        font-size: 16px;
      }

      .search-box input {
        border: 0;
        color: #023192;
        font-size: 14px;
        font-weight: 700;
        outline: 0;
        width: 100%;
      }

      .notification-dot {
        background: #fc6910;
        border: 2px solid #ffffff;
        border-radius: 50%;
        height: 10px;
        position: absolute;
        right: 11px;
        top: 10px;
        width: 10px;
      }

      .content {
        flex: 1;
        min-width: 0;
        overflow: auto;
        padding: 0 40px 40px;
      }

      @media (max-width: 1000px) {
        .organik-layout {
          display: block;
        }

        .sidebar {
          border-radius: 0;
          margin: 0;
          min-height: auto;
          width: 100%;
        }

        .menu {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .topbar,
        .topbar-actions {
          align-items: stretch;
          flex-direction: column;
        }

        .search-box {
          width: 100%;
        }

        .topbar,
        .content {
          padding-left: 16px;
          padding-right: 16px;
        }
      }
    `,
  ],
})
export class OrganikLayout {
  readonly iamStore = inject(IamStore);
  readonly searchStore = inject(SearchStore);
  readonly router = inject(Router);
  private readonly translate = inject(TranslateService);

  readonly menuItems: MenuItem[] = [
    { to: '/home', icon: 'pi pi-microsoft', labelKey: 'option.dashboard', roles: ['admin', 'supplier'] },
    { to: '/inventory', icon: 'pi pi-box', labelKey: 'option.inventory', roles: ['admin'] },
    { to: '/products', icon: 'pi pi-shopping-bag', labelKey: 'option.products', roles: ['admin', 'supplier'] },
    { to: '/requisition', icon: 'pi pi-list-check', labelKey: 'option.requisition', roles: ['admin', 'supplier'] },
    { to: '/procurements', icon: 'pi pi-truck', labelKey: 'option.procurements', roles: ['admin', 'supplier'] },
    { to: '/suppliers', icon: 'pi pi-users', labelKey: 'option.suppliers', roles: ['admin', 'supplier'] },
    { to: '/conservation', icon: 'pi pi-cloud', labelKey: 'option.conservation', roles: ['admin'] },
    { to: '/analytics', icon: 'pi pi-chart-bar', labelKey: 'option.analytics', roles: ['admin', 'supplier'] },
    { to: '/communication', icon: 'pi pi-comments', labelKey: 'option.communication', roles: ['admin', 'supplier'] },
    { to: '/profiles', icon: 'pi pi-id-card', labelKey: 'option.profiles', roles: ['admin', 'supplier'] },
    { to: '/iam', icon: 'pi pi-shield', labelKey: 'option.iam', roles: ['admin'] },
    { to: '/settings', icon: 'pi pi-cog', labelKey: 'option.settings', roles: ['admin', 'supplier'] },
  ];

  readonly activeRoleKey = computed(() => (this.iamStore.isSupplier() ? 'supplier' : 'admin'));
  readonly visibleMenuItems = computed(() =>
    this.menuItems.filter((item) => item.roles.includes(this.activeRoleKey())),
  );
  readonly userInitials = computed(() =>
    this.iamStore.userName().split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
  );
  readonly pageTitle = computed(() => {
    const item = this.menuItems.find((menuItem) => this.router.url === menuItem.to);
    return this.translate.instant(item?.labelKey || 'option.dashboard');
  });
  readonly todayDate = computed(() =>
    new Date().toLocaleDateString(this.translate.currentLang() === 'en' ? 'en-US' : 'es-PE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  );

  constructor() {
    this.translate.addLangs(['es', 'en']);
    this.translate.setFallbackLang('en');
    this.translate.use('es');
    this.iamStore.fetchUsers();
    effect(() => {
      const hasVisibleRoute = this.visibleMenuItems().some((item) => this.router.url === item.to);
      const alwaysAllowedPaths = ['/dashboard', '/access-denied'];
      if (!hasVisibleRoute && !alwaysAllowedPaths.includes(this.router.url)) {
        this.router.navigateByUrl('/access-denied');
      }
    });
  }
}
