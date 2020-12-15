
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';



@Component ({
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
   
})

export class SignupComponent {

    isLoading = false;
    vLink: string = '';

    constructor(public authService: AuthService) {}

    onSignup(form: NgForm) {
        if (form.invalid) {
            return;
        }

        this.authService.createUser(form.value.email, form.value.password, form.value.username);

        this.veri(form.value.username, form.value.email);


    }
    
    veri(name, email) {
        var text = "";
        var s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&^%$#!@#$%^&*";

        for (var i = 0; i < 30; i++) {
            text += s.charAt(Math.floor(Math.random() * s.length))+
                    name.charAt(Math.floor(Math.random() * name.length))+
                    email.charAt(Math.floor(Math.random() * email.length))
                    
        }

        this.vLink = text + '.com';
        console.log(this.vLink);

    }

    

}