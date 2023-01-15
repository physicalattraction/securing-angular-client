import {Component, OnInit} from "@angular/core";
import {AuthService} from "../core/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-signin-callback',
    template: '<div></div>'
})
export class SigninRedirectCallbackComponent implements OnInit {
    constructor(private _authService: AuthService,
                private _router: Router) {
    }

    ngOnInit() {
        this._authService.completeLogin().then(user => {
            console.log('SigninRedirectCallbackComponent ngOnInit()');
            this._router.navigate(['/'], {replaceUrl: true});
        })
    }
}