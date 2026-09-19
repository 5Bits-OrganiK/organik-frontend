import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', loadComponent: () => import('./shared/presentation/views/dashboard-shell').then((m) => m.DashboardShell), title: 'OrganiK - Dashboard' },
  { path: 'settings', loadComponent: () => import('./shared/presentation/views/settings').then((m) => m.Settings), title: 'OrganiK - Configuracion' },
  { path: 'access-denied', loadComponent: () => import('./shared/presentation/views/access-denied').then((m) => m.AccessDenied), title: 'OrganiK - Acceso denegado' },
  { path: 'iam', loadComponent: () => import('./iam/presentation/views/users-access').then((m) => m.UsersAccess), title: 'OrganiK - Usuarios y roles' },
  { path: 'profiles', loadComponent: () => import('./profiles/presentation/views/profile-management').then((m) => m.ProfileManagement), title: 'OrganiK - Perfiles' },
  { path: 'dashboard', loadComponent: () => import('./dashboard/presentation/views/role-dashboard').then((m) => m.RoleDashboard), title: 'OrganiK - Dashboard' },
  { path: 'analytics', loadComponent: () => import('./analytics/presentation/views/analytics-summary').then((m) => m.AnalyticsSummary), title: 'OrganiK - Analitica' },
  { path: 'inventory', loadComponent: () => import('./inventory/presentation/views/inventory-control').then((m) => m.InventoryControl), title: 'OrganiK - Inventario' },
  { path: 'products', loadComponent: () => import('./products/presentation/views/product-catalog').then((m) => m.ProductCatalog), title: 'OrganiK - Productos' },
  { path: 'requisition', loadComponent: () => import('./requisition/presentation/views/requisition-board').then((m) => m.RequisitionBoard), title: 'OrganiK - Solicitudes' },
  { path: 'procurements', loadComponent: () => import('./procurements/presentation/views/procurement-orders').then((m) => m.ProcurementOrders), title: 'OrganiK - Ordenes de envio' },
  { path: 'suppliers', loadComponent: () => import('./suppliers/presentation/views/supplier-directory').then((m) => m.SupplierDirectory), title: 'OrganiK - Proveedores' },
  { path: 'conservation', loadComponent: () => import('./conservation/presentation/views/conservation-monitoring').then((m) => m.ConservationMonitoring), title: 'OrganiK - Conservacion' },
  { path: 'communication', loadComponent: () => import('./communication/presentation/views/alert-center').then((m) => m.AlertCenter), title: 'OrganiK - Alertas' },
  { path: '**', redirectTo: 'home' },
];
