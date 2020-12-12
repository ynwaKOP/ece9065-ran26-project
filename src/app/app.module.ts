import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule  } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {CdkTableModule} from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { AppComponent } from './app.component';
import { ListCreateComponent } from './lists/list-create.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ShowListComponent } from './lists/show-list/show-list.component';
import { VisitorPageComponent } from './visitor/visitor.component'
import { LoginComponent } from './visitor/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './visitor/login/signup.component';
import { AuthInterceptor } from './visitor/login/auth-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    ListCreateComponent,
    HeaderComponent,
    ShowListComponent,
    VisitorPageComponent,
    LoginComponent,
    SignupComponent
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTableModule,
    CdkTableModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
