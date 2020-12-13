import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';



@Injectable({providedIn: 'root'})

export class AdminService implements OnInit{


    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      constructor( private http: HttpClient, private router: Router) { }


    ngOnInit() {

    }

    getActiveUser() {

    }


    activeUser(email: string) {

        const info = {
            email: email
        }

        const url = "http://localhost:3000/api/admin/active";

        this.http.post<any>(url, info)
        .subscribe();
        
    }



    deactiveUser(email: string) {

        const info = {
            email: email
        }
        const url = "http://localhost:3000/api/admin/deactive";
        console.log(info);
        this.http.post<any>(url, info)
                .subscribe();

    }









}