import {Component, OnInit} from '@angular/core';
import {HerpControllerDataService} from '../services/herpcontrollerdata.service';
import {DeviceModel} from '../models/devicemodel';
import {MatList, MatListItem, MatListItemMeta, MatListItemTitle} from '@angular/material/list';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-config',
  imports: [
    MatListItem,
    MatListItemTitle,
    MatIconButton,
    MatListItemMeta,
    MatIcon,
    MatList,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    RouterLink
  ],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent implements OnInit {
  devices: DeviceModel[] = [];

  constructor(private dataService: HerpControllerDataService) {
  }

  ngOnInit() {
    this.dataService.getAllDevices().subscribe(devices => this.devices = devices);
  }
}
