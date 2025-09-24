import { Injectable } from '@angular/core';
import { ApiService } from '../api-service';
import { Feedback, Goal } from '../../models/interfaceType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
    private controller = 'Goals';

  constructor(private api: ApiService) {}

  getAll(): Observable<Goal[]> {
    return this.api.get<Goal[]>(this.controller);
  }

  getById(id: string): Observable<Goal> {
    return this.api.get<Goal>(`${this.controller}/${id}`);
  }

  getByUserId(userId: string): Observable<Goal[]> {
    return this.api.get<Goal[]>(`${this.controller}/user/${userId}`);
  }

  getByStatus(status: string): Observable<Goal[]> {
    return this.api.get<Goal[]>(`${this.controller}/status/${status}`);
  }

  create(goal: Goal): Observable<Goal> {
    return this.api.post<Goal>(this.controller, goal);
  }

  update(id: string, goal: Goal): Observable<Goal> {
    return this.api.put<Goal>(`${this.controller}/${id}`, goal);
  }

  delete(id: string): Observable<Goal|null> {
    return this.api.delete<Goal>(`${this.controller}/${id}`);
  }

  analyseFeedback(goalId: string): Observable<Feedback> {
    return this.api.get<Feedback>(`${this.controller}/analyse/goalId:${goalId}`);
  }
}
