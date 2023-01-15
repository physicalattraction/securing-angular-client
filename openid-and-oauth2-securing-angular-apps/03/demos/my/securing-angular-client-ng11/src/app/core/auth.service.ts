import {Injectable} from "@angular/core";
import {User, UserManager} from 'oidc-client'
import {CoreModule} from "./core.module";
import {Constants} from "../constants";
import {Subject} from 'rxjs';
import {SigninRedirectCallbackComponent} from "../home/signin-redirect-callback.component";

@Injectable({
    providedIn: CoreModule
})
export class AuthService {
    private _userManager: UserManager
    private _user: User
    private _loginChangedSubject = new Subject<boolean>();

    loginChanged = this._loginChangedSubject.asObservable();

    constructor() {
        const stsSettings = {
            authority: Constants.stsAuthority,
            client_id: Constants.clientId,
            redirect_uri: `${Constants.clientRoot}signin-callback`,
            scope: 'openid profile projects-api',
            response_type: 'code',
            post_logout_redirect_uri: `${Constants.clientRoot}signout-callback`,
        };
        this._userManager = new UserManager(stsSettings);
    }

    login() {
        console.log('AuthService login()');
        return this._userManager.signinRedirect();
    }

    isLoggedIn(): Promise<boolean> {
        console.log('AuthService isLoggedIn()', this._userManager.getUser().then(this._userIsLoggedIn));
        return this._userManager.getUser().then(this._userIsLoggedIn)
    }

    completeLogin(): Promise<User> {
        console.log('AuthService completeLogin()');
        return this._userManager.signinRedirectCallback().then(user => {
            this._user = user;
            this._loginChangedSubject.next(!!user && !user.expired);
            return user;
        })
    }

    logout() {
        console.log('AuthService logout()');
        this._userManager.signoutRedirect();
    }

    completeLogout() {
        console.log('AuthService completeLogout()');
        this._user = null;
        return this._userManager.signoutRedirectCallback();
    }

    _userIsLoggedIn(user: User): boolean {
        const userCurrent = !!user && !user.expired;
        if (this._user !== user) {
            this._loginChangedSubject.next(userCurrent);
        }
        this._user = user;
        return userCurrent;
    };
    
}
