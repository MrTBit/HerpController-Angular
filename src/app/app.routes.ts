import { Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ConfigComponent} from './config/config.component';
import {AuthGuard} from './services/authguard';
import {DeviceApiConfigComponent} from './deviceapiconfig/deviceapiconfig.component';
import {DeviceHardwareConfigComponent} from './devicehardwareconfig/devicehardwareconfig.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: DashboardComponent},
  {path: 'config', component: ConfigComponent, canActivate: [AuthGuard]},
  {path: 'config/api/:id', component: DeviceApiConfigComponent, canActivate: [AuthGuard]},
  {path: 'config/hardware/:id', component: DeviceHardwareConfigComponent, canActivate: [AuthGuard]}
];
