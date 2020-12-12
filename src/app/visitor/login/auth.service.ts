import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';

@Injectable({providedIn: "root"})

export class AuthService {

    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;

    private authStatusListener = new Subject<boolean>();


    constructor(private http:HttpClient,  private router: Router ) {}

    createUser(email: string, password: string, username: string) {

        const authData: AuthData = {
            username: username,
            email: email,
            password: password
        };

        const url = "http://localhost:3000/api/signup"
        this.http.post(url, authData)
            .subscribe(r => {
                console.log(r);
                this.router.navigate(['/login']);
            });
    }


    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }


    getIsAuth() {
        return this.isAuthenticated;
    }


    userLogin(email: string, password: String) {

        const authData: any = {
            email: email,
            password: password
        };

        const url = "http://localhost:3000/api/secure/login"
        this.http.post<{token: string, expiresIn: number}>(url, authData)
            .subscribe(r => {
                const token = r.token;
                this.token = token;
                if (token) {
                    const expiresInDuration = r.expiresIn;
                    this.setAuthTimer(expiresInDuration);
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                    this.saveAuthData(token, expirationDate);
                    this.router.navigate(['user']);
                }
                
            });

        console.log(url);
    }



    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }

        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }


    userLogout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['']);
       
    }


    private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
    }


    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }


    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        if( !token || !expirationDate) {
            return;
        }

        return {
            token: token,
            expirationDate: new Date(expirationDate)
        }
    }


    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.userLogout();
        }, duration * 1000);
    }

    getToken() {
        return this.token;
    }
   


}