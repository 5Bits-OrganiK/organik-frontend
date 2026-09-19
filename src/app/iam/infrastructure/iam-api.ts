import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../domain/model/user.entity';
import { apiEndpoints, platformApiBaseUrl } from '../../shared/infrastructure/api-endpoints';

@Injectable({ providedIn: 'root' })
export class IamApi {
  private readonly http = inject(HttpClient);

  signIn(credentials: unknown): Observable<unknown> {
    return this.http.post(`${platformApiBaseUrl}${apiEndpoints.auth}/sign-in`, credentials);
  }

  signUp(payload: unknown): Observable<unknown> {
    return this.http.post(`${platformApiBaseUrl}${apiEndpoints.auth}/sign-up`, payload);
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${platformApiBaseUrl}${apiEndpoints.users}`)
      .pipe(map((response) => response.map((item) => new User(item))));
  }
}
