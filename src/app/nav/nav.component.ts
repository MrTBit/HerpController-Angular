import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {DashboardComponent} from '../dashboard/dashboard.component';

@Component({
  selector: 'app-nav',
  imports: [MatSidenavModule, MatToolbar, MatIconButton, MatIcon, MatButton, DashboardComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

}
