import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterService } from '../../services/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  title = 'Foodie-Frontend';

  registerObj: any = {
    name: "",
    email: "",
    password: ""
  }

  masterSrv = inject(MasterService);
  router = inject(Router);

  redirectToLogin() {
    this.router.navigateByUrl('login');
  }
  onRegister() {
    this.masterSrv.register(this.registerObj).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        localStorage.setItem('authToken',res.access_token);
        this.router.navigateByUrl('home');
      } else {
        alert("Sorry Registration Failed:"+ (res.message));
        this.clearFields();
        this.router.navigateByUrl('register');
      }
    }, (err: any) => {
      alert("User already exists");
      this.clearFields();
    });
  }



  clearFields() {
    this.registerObj.name = "";
    this.registerObj.email = "";
    this.registerObj.password = "";
  }
}
