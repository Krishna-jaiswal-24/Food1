import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterService } from '../../services/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginObj: any = {
    email: "",
    password: ""
  }

  masterSrv = inject(MasterService);
  router = inject(Router);

  onLogin() {
    this.masterSrv.login(this.loginObj).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        localStorage.setItem('authToken',res.access_token);
        this.router.navigateByUrl('home');
      } else {
        alert("Sorry Signin Failed");
        this.clearFields();
        this.router.navigateByUrl('login');
      }
    }, (err: any) => {
      alert("Sorry Signin Failed");
      this.clearFields();
    });
  }

  redirectToRegister() {
    this.router.navigateByUrl('register');
  }

  clearFields() {
    this.loginObj.email = "";
    this.loginObj.password = "";
  }
}
