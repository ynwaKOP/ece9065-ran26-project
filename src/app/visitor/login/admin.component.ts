import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from './admin.service';




@Component({
    selector: 'app-visitor-page',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

    isLoading = false;
    activeUsers: any = [];
    deactives: any = [];


  constructor(public adminService: AdminService) {}
    
    ngOnInit(): void {
        this.getActiveUsers();
        this.getDeactiveUsers();
    }


    ngOnDestroy() {
        //this.listsSub.unsubscribe();
    }

    getActiveUsers(): any {
        this.isLoading = true;
        this.adminService.getActiveUser().subscribe(c => this.activeUsers = c);
        this.isLoading = false;
    }


    getDeactiveUsers(): any {
        this.isLoading = true;
        this.adminService.getDeactive().subscribe( c => this.deactives = c);
        this.isLoading = false;
    }


    active(form: NgForm) {
        this.isLoading = true;
        console.log(form.value.activeEmail);
        this.adminService.activeUser(form.value.activeEmail)
        form.resetForm();
        this.getActiveUsers();
        this.getDeactiveUsers();
        this.isLoading = false;
    }

    deActive(form:NgForm) {
        this.isLoading = true;
        this.adminService.deactiveUser(form.value.deemail);

        this.getActiveUsers();
        this.getDeactiveUsers();
        
        form.resetForm();
        this.isLoading = false;
    }

  
    
}

