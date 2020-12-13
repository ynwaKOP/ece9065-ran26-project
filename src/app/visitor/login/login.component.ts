import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component ({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    isLoading = false;

    error: string;
    
    constructor(public authService: AuthService) {}

    onLogin(form: NgForm) {
        this.isLoading = true;
        if (form.invalid) {
            return;
        }

        this.authService.userLogin(form.value.email, form.value.password);
        this.isLoading = false;
        
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