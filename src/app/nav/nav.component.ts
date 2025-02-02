import {Component, inject} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {AuthService} from '../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {LoginDialog, LoginDialogData} from '../dialogs/logindialog';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [MatSidenavModule, MatToolbar, MatIconButton, MatIcon, MatButton, MatMenuTrigger, MatMenu, MatMenuItem, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  readonly dialog = inject(MatDialog);

  authenticated: boolean;

  constructor(public authService: AuthService) {
    this.authenticated = authService.getIsAuthenticated();

    authService.authSubject.subscribe((authenticated) => this.authenticated = authenticated);
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialog, {
      data: {username: "", password: ""}
    });

    dialogRef.afterClosed().subscribe((result: LoginDialogData) => {
      this.authService.login(result.username, result.password);
    });
  }

}
