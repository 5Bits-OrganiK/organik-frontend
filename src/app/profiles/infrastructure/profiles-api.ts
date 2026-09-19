import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Profile } from '../domain/model/profile.entity';
import { apiEndpoints, platformApiBaseUrl } from '../../shared/infrastructure/api-endpoints';

@Injectable({ providedIn: 'root' })
export class ProfilesApi {
  private readonly http = inject(HttpClient);

  getProfiles(): Observable<Profile[]> {
    return this.http
      .get<Profile[]>(`${platformApiBaseUrl}${apiEndpoints.profiles}`)
      .pipe(map((response) => response.map((item) => new Profile(item))));
  }

  updateProfile(id: string, payload: unknown): Observable<Profile> {
    return this.http
      .patch<Profile>(`${platformApiBaseUrl}${apiEndpoints.profiles}/${id}`, payload)
      .pipe(map((response) => new Profile(response)));
  }
}
