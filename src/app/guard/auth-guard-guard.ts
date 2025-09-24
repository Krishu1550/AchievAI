import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getToken } from '../store/goal.selector';
import { map, take } from 'rxjs/operators';
import { Token } from '../models/interfaceType';
import { StorageService } from '../services/storage-service';

export const authGuard: CanActivateFn = (route, state) => {
   const store = inject(Store);
  const router = inject(Router);
  const localStorages =inject(StorageService)

  return store.select(getToken).pipe(
    take(1), // only take the current value
    map((token:Token|null )=> {
      const getToken = localStorages.getItem('token');
      console.log('Token from store:', token);
      console.log('Token from localStorage:', getToken);
      if (getToken|| token) {
        return true; // user is authenticated
      } else {
        router.navigate(['/login']); // redirect unauthenticated users
        return false;
      }
    })
  );
};
