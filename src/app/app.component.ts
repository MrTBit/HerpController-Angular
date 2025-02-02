import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavComponent} from './nav/nav.component';
import {SignalrService} from './services/signalr.service';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private signalRService: SignalrService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.signalRService.connect();

    if (this.authService.getIsAuthenticated()) {
      this.signalRService.connectAuthed();
    }

    this.authService.authSubject.subscribe(isAuth => {
      if (isAuth) {
        this.signalRService.connectAuthed();
      }
    })
  }

  title = 'HerpController-Angular';
}
