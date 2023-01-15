import {Component, OnInit} from '@angular/core';
import {AuthService} from "./core/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: []
})
export class AppComponent implements OnInit {
    isLoggedIn: boolean = false

    constructor(private _authService: AuthService) {
        this._authService.loginChanged.subscribe(this._setIsLoggedIn);
    }

    ngOnInit() {
        this._authService.isLoggedIn().then(this._setIsLoggedIn);
        console.log('AppComponent ngOnInit() isLoggedIn: ', this.isLoggedIn);
    }

    login() {
        console.log('AppComponent login()');
        this._authService.login();
    }

    logout() {
        console.log('AppComponent logout()');
        this._authService.logout();
    }

    _setIsLoggedIn(value: boolean) {
        this.isLoggedIn = value;
    }
}
