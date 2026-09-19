import { Injectable, computed, inject, signal } from '@angular/core';
import { CommunicationApi } from '../infrastructure/communication-api';
import { Message } from '../domain/model/message.entity';

const demoMessages = [
  new Message({ id: 'alert-1', sender: 'Sistema OrganiK', receiver: 'Minimarket Verde Sur', subject: 'Humedad elevada', body: 'Anaquel fresco supera el rango recomendado.', read: false, starred: true, sentAt: '2026-09-18 09:35' } as Message),
  new Message({ id: 'alert-2', sender: 'Sistema OrganiK', receiver: 'Minimarket Verde Sur', subject: 'Vencimiento cercano', body: 'Yogurt organico vence en 5 dias.', read: false, starred: false, sentAt: '2026-09-18 10:05' } as Message),
  new Message({ id: 'alert-3', sender: 'Sistema OrganiK', receiver: 'Minimarket Verde Sur', subject: 'Stock bajo', body: 'Leche organica se acerca al stock minimo.', read: false, starred: false, sentAt: '2026-09-18 10:30' } as Message),
  new Message({ id: 'alert-4', sender: 'Sistema OrganiK', receiver: 'Minimarket Verde Sur', subject: 'Orden pendiente', body: 'Anita Gamboa tiene una orden por confirmar.', read: true, starred: false, sentAt: '2026-09-18 11:20' } as Message),
];

@Injectable({ providedIn: 'root' })
export class CommunicationStore {
  private readonly communicationApi = inject(CommunicationApi);
  readonly messages = signal<Message[]>(demoMessages);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly unreadCount = computed(() => this.messages().filter((message) => !message.read).length);

  fetchMessages(): void {
    this.loading.set(true);
    this.communicationApi.getNotifications().subscribe({
      next: (messages) => {
        this.messages.set(messages);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar alertas. Se muestran datos demo.');
        this.messages.set(demoMessages);
        this.loading.set(false);
      },
    });
  }

  markAsRead(id: string): void {
    this.messages.update((messages) => messages.map((message) => {
      if (message.id !== id) return message;
      const next = new Message(message);
      next.markAsRead();
      return next;
    }));
  }

  toggleStarred(id: string): void {
    this.messages.update((messages) => messages.map((message) => {
      if (message.id !== id) return message;
      const next = new Message(message);
      next.toggleStarred();
      return next;
    }));
  }
}
