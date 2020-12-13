import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from './admin.service';




@Component({
    selector: 'app-visitor-page',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {




  constructor(public adminService: AdminService) {}
    
    ngOnInit(): void {
    }


    getActiveUsers() {

    }



    getDeactiveUsers() {

    }


    active(form: NgForm) {
        console.log(form.value.activeEmail);
        this.adminService.activeUser(form.value.activeEmail)
        form.resetForm();
    }

    deActive(form:NgForm) {
        
        this.adminService.deactiveUser(form.value.deemail);
        
        form.resetForm();
    }

  
    
}

