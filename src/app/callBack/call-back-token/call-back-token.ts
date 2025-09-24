import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Token } from '../../models/interfaceType';
import { setToken } from '../../store/goal.action';
import { Store } from '@ngrx/store';
import { StorageService } from '../../services/storage-service';

@Component({
  selector: 'app-call-back-token',
  imports: [],
  templateUrl: './call-back-token.html',
  styleUrl: './call-back-token.css'
})
export class CallBackToken {

  route: ActivatedRoute = inject(ActivatedRoute);
  localStore:StorageService=inject(StorageService);

 token: Token = {
  AccessToken: '',
  UserName: '',
  UserId: '',
  Role: [],
  Expiration: new Date()
};
  store:Store=inject(Store);
  router = inject(Router);

  constructor() {
    this.route.queryParams.subscribe(params => {
      const tokenParam = params['token'];
      if (tokenParam) {
        try {
          this.token = JSON.parse(decodeURIComponent(tokenParam));
        
          this.localStore.setItem('token', JSON.stringify(this.token));
          this.localStore.setItem('userId', JSON.stringify(this.token.UserId));
          this.localStore.setItem('userName', JSON.stringify(this.token.UserName));
          this.localStore.setItem("accessToken",JSON.stringify(this.token.AccessToken));
          console.log('Access Token:', this.token.AccessToken);
          console.log('User Name:', this.token.UserName);

          console.log('User ID:', this.token.UserId);
       
          if (this.token){
           this.store.dispatch(setToken({ token: this.token }));
          console.log('Parsed token:', this.token);
             this.router.navigate(['/']);

          }
          
        } catch (error) {
          console.error('Error parsing token:', error);
        }
      }
    });
  }
}
