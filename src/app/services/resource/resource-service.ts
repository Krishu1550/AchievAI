import { Injectable } from '@angular/core';
import { ApiService } from '../api-service';
import { Resource } from '../../models/interfaceType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
   private controller = 'Resources';

  constructor(private api: ApiService) {}

  getById(id: string): Observable<Resource> {
    return this.api.get<Resource>(`${this.controller}/${id}`);
  }

  getByGoalId(goalId: string): Observable<Resource[]> {
    return this.api.get<Resource[]>(`${this.controller}/goal/${goalId}`);
  }

  create(resource: Resource): Observable<Resource> {
    return this.api.post<Resource>(this.controller, resource);
  }

  update(id: string, resource: Resource): Observable<Resource> {
    return this.api.put<Resource>(`${this.controller}/${id}`, resource);
  }

  delete(id: string): Observable<boolean|null> {
    return this.api.delete<boolean>(`${this.controller}/${id}`);
  }
}
