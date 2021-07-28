import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  showStartBoard = false;

  form: any = {
    username: '',
    password: ''
  };

  username = new FormControl('', [Validators.minLength(3)]);
  password = new FormControl('', [Validators.minLength(6)]);

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.redirectPage(username);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  redirectPage(username: string): void {
    window.location.href = `/home`; //user/${username} ta pegando com a autenticação??? no meu pc nao esta indo
  }

  getMessage() {
    if(this.username.invalid) {
      return 'O campo username deve conter entre 3 e 20 caracteres';
    }

    if(this.password.invalid) {
      return 'O campo password do autor deve conter entre 6 e 120 caracteres';
    }
    return false;
  }

}

