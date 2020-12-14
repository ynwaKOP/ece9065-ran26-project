import { ContentObserver } from '@angular/cdk/observers';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component ({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    isLoading = false;
    error: any;

    deError = false;
    
    constructor(public authService: AuthService) {}

    onLogin(form: NgForm) {
        this.deError = false;
        this.isLoading = true;
        if (form.invalid) {
            return;
        }

        this.authService.userLogin(form.value.email, form.value.password);
        this.getError();
        
        this.isLoading = false;
        
    }


    getError() {
        this.error = this.authService.getLogInError();
        console.log(this.error);
        if (this.error[0].message === "deactive") {
            this.deError = true;
        }
        console.log(this.error);
    }


    adminLogin(form: NgForm) {
        this.isLoading = true;
        if (form.invalid) {
            return;
    }

    this.authService.adminLogin(form.value.email, form.value.password);
    this.isLoading = false;
        
    }
}