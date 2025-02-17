import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { AccountPopupComponent } from '../account-popup/account-popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  loggedUser?: User;
  isToggled = false;

  toggleClasses() {
    this.isToggled = !this.isToggled;
  }

  constructor(
    private modalService: BsModalService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService
      .getLoggedUser()
      .subscribe((user) => (this.loggedUser = user));
  }

  openLoginPopup() {
    this.modalService.show(LoginPopupComponent, {
      class: 'modal-xl',
    });
  }

  openAccountPopup() {
    this.modalService.show(AccountPopupComponent, {
      class: 'modal-lg',
      initialState: { loggedUser: this.loggedUser },
    });
  }

  isActionneurRoute(): boolean {
    return this.router.url.includes('actionner');
  }
}
