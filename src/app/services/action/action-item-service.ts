import { Injectable } from '@angular/core';
import { ApiService } from '../api-service';
import { ActionItem } from '../../models/interfaceType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionItemService {
    private controller = 'ActionItems';

  constructor(private api: ApiService) {}

  getAll(): Observable<ActionItem[]> {
    return this.api.get<ActionItem[]>(this.controller);
  }

  getById(id: string): Observable<ActionItem> {
    return this.api.get<ActionItem>(`${this.controller}/${id}`);
  }

  getByGoalId(goalId: string): Observable<ActionItem[]> {
    return this.api.get<ActionItem[]>(`${this.controller}/goal/${goalId}`);
  }

  create(actionItem: ActionItem): Observable<ActionItem> {
    return this.api.post<ActionItem>(this.controller, actionItem);
  }

  update(id: string, actionItem: ActionItem): Observable<ActionItem> {
    return this.api.put<ActionItem>(`${this.controller}/${id}`, actionItem);
  }

  delete(id: string) {
    this.api.delete<void>(`${this.controller}/${id}`);
  }
}
