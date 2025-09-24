import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer, ListGoals, NavBar } from './components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavBar,Footer,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'AchievAI';
}
