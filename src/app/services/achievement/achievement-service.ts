import { Injectable } from '@angular/core';
import { ApiService } from '../api-service';
import { Observable } from 'rxjs';
import { Achievement } from '../../models/interfaceType';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {
  
  private controller = 'Achievements';

  constructor(private api: ApiService) {}

  getById(id: string): Observable<Achievement> {
    return this.api.get<Achievement>(`${this.controller}/${id}`);
  }

  getByGoalId(goalId: string): Observable<Achievement[]> {
    return this.api.get<Achievement[]>(`${this.controller}/goal/${goalId}`);
  }

  getByUserId(userId: string): Observable<Achievement[]> {
    return this.api.get<Achievement[]>(`${this.controller}/user/${userId}`);
  }

  create(achievement: Achievement): Observable<Achievement> {
    return this.api.post<Achievement>(this.controller, achievement);
  }

  update(id: string, achievement: Achievement): Observable<Achievement> {
    return this.api.put<Achievement>(`${this.controller}/${id}`, achievement);
  }

  delete(id: string) {
     this.api.delete<void>(`${this.controller}/${id}`);
  }
}
