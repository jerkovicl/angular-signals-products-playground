import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LoginForm, User, UserLogin } from '../auth.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  public loginForm!: FormGroup<LoginForm>;
  private readonly fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    /*
    FormControl, FormGroup and FormArray classes from Angular forms now expose a property called events, which allows you to subscribe to a stream of events for this form control.
    Using it you can track changes in value, touch state, pristine status, and the control status.
    */
    this.loginForm.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        // process the individual events
        console.log(event);
      });
  }

  onSubmit(): void {
    const userInfo: UserLogin = { ...(this.loginForm.value as UserLogin) };
    this.authService
      .login(userInfo)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user: User) => this.authService.setToken(user.token),
        error: () => console.error('Invalid email or password'),
        complete: () => {
          this.router.navigateByUrl('/');
        },
      });
  }
}
