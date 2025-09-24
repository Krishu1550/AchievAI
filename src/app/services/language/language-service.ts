import { Inject, Injectable } from '@angular/core';
import { ApiService } from '../api-service';
import { UserMessage, UserMessageRequest } from '../../models/interfaceType';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  
  constructor(private apiService:ApiService) { }

  getAiMessage(userMessages:UserMessageRequest)
  {
    return this.apiService.post<UserMessage>('LanguageModel/message', userMessages);
  }
  
}
