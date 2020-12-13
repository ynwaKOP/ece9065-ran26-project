import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../visitor/login/auth.service';


@Component({

    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit, OnDestroy {

    userIsAuthenticated = false;
    adminIsAuthenticated = false;
    private authListenerSubs: Subscription;

    constructor(private authService: AuthService) {}

    ngOnInit() {

        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
        });

    }


    onLogout() {
        this.authService.userLogout();
    }

    ngOnDestroy() {
        this.authListenerSubs.unsubscribe();
    }



}