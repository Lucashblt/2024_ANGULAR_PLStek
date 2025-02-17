import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-popup',
  templateUrl: './account-popup.component.html',
  styleUrls: ['./account-popup.component.scss'],
})
export class AccountPopupComponent implements OnInit {
  loggedUser!: User;

  editPassword: boolean = false;

  passwordForm!: FormGroup;

  constructor(
    private bsModalRef: BsModalRef,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.bsModalRef.content) {
      this.loggedUser = this.bsModalRef.content.loggedUser;
    } else {
      this.bsModalRef.hide();
    }

    this.passwordForm = this.formBuilder.group(
      {
        oldPassword: [
          '',
          [
            Validators.required /* 
            Validators.minLength(6), */,
            Validators.maxLength(32),
          ],
        ],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(32),
          ],
        ],
        newPasswordConfirmation: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(32),
          ],
        ],
      },
      { validator: this.checkPasswords }
    );
  }

  checkPasswords(group: FormGroup) {
    if (
      group.get('newPassword')?.value !==
      group.get('newPasswordConfirmation')?.value
    ) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }

  logout() {
    this.authService.logout();
    this.bsModalRef.hide();
    this.router.navigate(['/acceuil']);
  }

  togglePasswordEdition() {
    this.editPassword = !this.editPassword;
  }

  submitPasswordChange() {
    if (this.passwordForm.valid) {
      const data = this.passwordForm.value;
      this.authService
        .changePassword(
          this.loggedUser.email,
          data.oldPassword,
          data.newPassword
        )
        .subscribe((success) => {
          if (success) {
            this.togglePasswordEdition();
          }
        });
    } else {
      console.log('Formulaire invalide');
    }
  }
}
