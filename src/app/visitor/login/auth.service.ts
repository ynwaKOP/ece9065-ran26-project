import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AuthData } from './auth-data.model';

@Injectable({providedIn: "root"})

export class AuthService {

    constructor(private http:HttpClient) {}



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
            });
    }






}