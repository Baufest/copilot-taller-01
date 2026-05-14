import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];
