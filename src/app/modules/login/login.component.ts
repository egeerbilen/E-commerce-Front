import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  /**
   *Constructor.
   * @param _fb Fb.
   */
  constructor(private _fb: FormBuilder) {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * OnSubmit.
   */
  public onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Email:', this.loginForm.get('email')?.value);
      console.log('Password:', this.loginForm.get('password')?.value);
    }
  }
}
