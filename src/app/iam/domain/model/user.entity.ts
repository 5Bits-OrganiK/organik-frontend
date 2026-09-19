export interface UserResource {
  id: string;
  name: string;
  email: string;
  status?: string;
  roles?: string[];
  permissions?: string[];
}

export class User {
  id: string;
  name: string;
  email: string;
  status: string;
  roles: string[];
  permissions: string[];

  constructor(resource: UserResource) {
    this.id = resource.id;
    this.name = resource.name;
    this.email = resource.email;
    this.status = resource.status || 'active';
    this.roles = resource.roles || [];
    this.permissions = resource.permissions || [];
  }

  get initials(): string {
    return this.name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }
}
