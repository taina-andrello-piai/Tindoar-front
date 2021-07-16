import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;

  form: any = {
    username: '',
    nome: '',
    email: '',
    whatsapp: '',
    rede_social: '',
    password: ''
  };

  username = new FormControl('', [Validators.minLength(3)]);
  nome = new FormControl('', [Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  whatsapp = new FormControl('', [Validators.minLength(3)]);
  rede_social = new FormControl('', [Validators.minLength(3)]);
  password = new FormControl('', [Validators.minLength(6)]);

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const {username, nome, email, whatsapp, rede_social, password } = this.form;

    this.authService.register(username, nome, email, whatsapp, rede_social, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.redirectPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.authService.mensagem(err.error.message);
        this.isSignUpFailed = true;
      }
    );
  }

  redirectPage(): void {
    window.location.href = '/login';
  }

  getMessage() {
    if(this.username.invalid) {
      return 'O campo username deve conter entre 3 e 20 caracteres';
    }

    if(this.email.invalid) {
      return 'O campo email é inválido';
    }

    if(this.password.invalid) {
      return 'O campo password deve conter entre 6 e 120 caracteres';
    }
    return false;
  }
}
