import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const authenticated: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router: Router = inject(Router);
    const authService: AuthService = inject(AuthService);
  
    if (authService.authenticated()) { 
        return true; 
    } else { 
        authService.setRedirectUrl(state.url); 
        router.navigate(['/sign/in']); 
        return false; 
    }
};