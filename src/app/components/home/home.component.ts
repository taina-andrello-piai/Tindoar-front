import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content?: string;
  isLoggedIn = false;
  private roles: string[] = [];
  showAdminBoard = false;
  showUserBoard = false;
  username?: string;
  showStartBoard = false;

  constructor(private userService: UserService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      if (this.roles.includes('ROLE_ADMIN')) {
        this.showAdminBoard = true;
      }
      else {
        this.showUserBoard = true;
      }
      this.username = user.username;
    }
    
  }

  goToPosts(): void {
    window.location.href = "/posts";
  }
}
