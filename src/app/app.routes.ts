import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { ActionList, ListGoals, ResourceList, Signin,Home, LearnLanguageComponent} from './components';
import { ForgetPassword } from './components/forget-password/forget-password';
import { CallBackToken } from './callBack/call-back-token/call-back-token';
import { authGuard } from './guard/auth-guard-guard';

export const routes: Routes = [

    {
        path:'',
      component:Home
    },

    {
        path:"login",
        component:Login,
        
    },
    {
        path:"sign-up",
        component:Signin
    },
    {
        path:"forget-password",
        component:ForgetPassword
    },
    {
        path:"goal-list",
        component:ListGoals,
        canActivate:[authGuard]
    },
    {
        path:"resource-list/:goalId",
        component:ResourceList,
        canActivate:[authGuard]
    },
    {
        path:"action-list/:goalId",
        component:ActionList,
        canActivate:[authGuard]
    },
    {
        path:"callback",
        component:CallBackToken
    },
    {
        path:"learn-lang",
        component:LearnLanguageComponent,
        canActivate:[authGuard]
    }
    
];
