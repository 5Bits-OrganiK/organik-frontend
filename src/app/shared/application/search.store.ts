import { Injectable, signal } from '@angular/core';

const normalize = (value: unknown): string => String(value ?? '').toLowerCase().trim();

const flattenValue = (value: unknown): string => {
  if (Array.isArray(value)) return value.map(flattenValue).join(' ');
  if (value && typeof value === 'object') return Object.values(value).map(flattenValue).join(' ');
  return String(value ?? '');
};

@Injectable({ providedIn: 'root' })
export class SearchStore {
  readonly query = signal('');

  setQuery(value: string): void {
    this.query.set(value);
  }

  clear(): void {
    this.query.set('');
  }

  filter<T extends object>(items: T[], fields: Array<keyof T | ((item: T) => unknown)> | null = null): T[] {
    const query = normalize(this.query());
    if (!query) return items;

    return items.filter((item) => {
      const values = fields?.length
        ? fields.map((field) => (typeof field === 'function' ? field(item) : item[field]))
        : Object.values(item);

      return normalize(values.map(flattenValue).join(' ')).includes(query);
    });
  }
}
