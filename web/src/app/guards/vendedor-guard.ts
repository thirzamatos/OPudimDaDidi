import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const vendedorGuard: CanActivateFn = () => {
  const router = inject(Router);
  const role = localStorage.getItem('role');

  if(role !== 'vendedor') {
    router.navigate(['/']);
    return false;
  }

  return true;
};
