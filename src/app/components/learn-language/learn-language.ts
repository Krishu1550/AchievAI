import { Component, inject, OnInit } from '@angular/core';
import { getMessages, getToken } from '../../store/goal.selector';
import { filter, Observable } from 'rxjs';
import { FromOptions, Token, UserMessage, UserMessageRequest } from '../../models/interfaceType';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { loadMessages } from '../../store/goal.action';
import { StorageService } from '../../services/storage-service';
import { LanguageService } from '../../services/language/language-service';

@Component({
  selector: 'app-learn-language',
  templateUrl: './learn-language.html',
  imports: [FormsModule, NgClass, NgFor],
  styleUrls: ['./learn-language.css']
})
export class LearnLanguageComponent implements OnInit {

  fromMessages: UserMessage[] = [];
  userInput: string = '';
  token$: Observable<Token> | null = null;
  private readonly store: Store = inject(Store);
  localStore: StorageService = inject(StorageService)
  languageService = inject(LanguageService);
  requestMessage?:UserMessageRequest

  // Supported languages
  languages = [
    { name: 'English', code: 'en-US' },
    { name: 'French', code: 'fr-FR' },
    { name: 'Spanish', code: 'es-ES' },
    { name: 'German', code: 'de-DE' },
    { name: 'Japanese', code: 'ja-JP' },
  ];

  selectedLanguage = this.languages[0].code; // Default: English

  constructor() 
  {
    this.token$ = this.store.select(getToken).pipe(
      filter((token: Token | null): token is Token => token !== null)
    );
    this.fromMessages = JSON.parse(this.localStore.getItem('messages') || '[]');
    this.store.dispatch(loadMessages({ messages: this.fromMessages }));
  }

  ngOnInit(): void {

  }

  speakMessages(id: string) 
  {
    console.log("speakMessages", id);
    const message = this.fromMessages.find(msg => msg.id === id);
    if (message && message.text) {
      this.speak(message.text);
    }

  }

  // Send text message
  sendMessage() {
    if (!this.userInput.trim()) return;

    // Add user text messageconst newMessage: UserMessage = {
    const newMessage: UserMessage = 
    {
      id: Date.now().toString(),
      text: this.userInput,
      from: FromOptions.user
    };

    this.requestMessage= {
      UserId: '',
      HistoryMessage: this.fromMessages,
      LatestMessage: newMessage,
      Language: this.selectedLanguage // <-- Add this line
    }

    this.languageService.getAiMessage(this.requestMessage).subscribe(
      (userMessage: UserMessage) => {
        this.fromMessages = [...this.fromMessages, userMessage];
        this.localStore.setItem('messages', JSON.stringify(this.fromMessages));
        this.store.dispatch(loadMessages({ messages: this.fromMessages }));
        this.speak(userMessage.text || '');
      }
    );
    // Create a new array instead of mutating the old one
    this.fromMessages = [...this.fromMessages, newMessage];

    this.localStore.setItem('messages', JSON.stringify(this.fromMessages));
    this.store.dispatch(loadMessages({ messages: this.fromMessages }));
    this.userInput = '';
  }

  // Start speech-to-text
  startVoiceInput() {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = this.selectedLanguage;
    recognition.interimResults = false; // Only final result
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event: any) => {
      this.userInput = event.results[0][0].transcript;
      console.log('Recognized text:', this.userInput);
      this.sendMessage();
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      alert('Error occurred in speech recognition: ' + event.error);
    };
  }

  // Text-to-speech
  speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.selectedLanguage;
    speechSynthesis.speak(utterance);
  }
}


