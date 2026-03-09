import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TourRoute } from '../models/tour-route.model';

@Injectable({ providedIn: 'root' })
export class RoutesService {
  private baseUrl = `${environment.apiUrl}/routes`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<TourRoute[]>(this.baseUrl);
  }

  create(payload: Omit<TourRoute, 'id' | 'createdAt'>) {
    return this.http.post<TourRoute>(this.baseUrl, payload);
  }

  update(id: string, payload: Omit<TourRoute, 'id' | 'createdAt'>) {
    return this.http.put<void>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
