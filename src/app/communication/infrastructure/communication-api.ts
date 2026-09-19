import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Message } from '../domain/model/message.entity';
import { apiEndpoints, platformApiBaseUrl } from '../../shared/infrastructure/api-endpoints';

interface AlertResource {
  id: string;
  sender?: string;
  receiver?: string;
  subject?: string;
  title?: string;
  body?: string;
  message?: string;
  read?: boolean;
  starred?: boolean;
  sentAt?: string;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class CommunicationApi {
  private readonly http = inject(HttpClient);

  getNotifications(): Observable<Message[]> {
    return this.http.get<AlertResource[]>(`${platformApiBaseUrl}${apiEndpoints.conservationAlerts}`).pipe(
      map((response) =>
        response.map(
          (item) =>
            new Message({
              id: item.id,
              sender: item.sender || 'Sistema OrganiK',
              receiver: item.receiver || 'Minimarket Verde Sur',
              subject: item.subject || item.title || '',
              body: item.body || item.message || '',
              read: item.read || false,
              starred: item.starred || false,
              sentAt: item.sentAt || item.createdAt || '',
            }),
        ),
      ),
    );
  }
}
