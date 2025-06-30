import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FileInputComponent, SingleSelectComponent } from '@shared/components';
import { PrimaryTextInputComponent } from '@shared/components/primary-text-input/primary-text-input.component';
import { passwordValidator } from '@shared/validators/form.validators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-form',
  imports: [
    ReactiveFormsModule,
    PrimaryTextInputComponent,
    SingleSelectComponent,
    FileInputComponent,
  ],
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.css',
})
export class DataFormComponent implements OnInit, OnDestroy {
  private formBuilder = inject(FormBuilder);
  private formSubscription!: Subscription;

  subscriptionOptions = [
    { name: 'Basic', value: 'basic' },
    { name: 'Advanced', value: 'advanced' },
    { name: 'Pro', value: 'pro' },
  ];

  dataForm = this.formBuilder.group({
    name: [
      '',
      [
        Validators.pattern(
          /^[a-zA-ZÀ-ÿ\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\s'-]+$/
        ),
        Validators.minLength(2),
        Validators.maxLength(5),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    subscription: [''],
    password: ['', [Validators.required, passwordValidator]],
  });

  get initSubscriptionOption() {
    return this.subscriptionOptions[1].value;
  }

  get isFormDirty() {
    return this.dataForm.dirty;
  }

  getControl(fieldName: string) {
    return this.dataForm.get(fieldName) as FormControl | null;
  }

  getErrorMessage(fieldName: string): string {
    const control = this.getControl(fieldName);
    if (!control || !control.errors || !control.touched) return '';

    if (control.errors['required']) {
      return `${this.getFieldDisplayName(fieldName)} is required`;
    }

    if (control.errors['email']) {
      return 'Please enter a valid email address';
    }

    if (control.errors['minlength']) {
      return `${this.getFieldDisplayName(
        fieldName
      )} min length must be at least ${
        control.errors['minlength'].requiredLength
      } characters`;
    }

    if (control.errors['maxLength']) {
      return `${this.getFieldDisplayName(
        fieldName
      )} max length must be at least ${
        control.errors['maxLength'].requiredLength
      } characters`;
    }

    if (control.errors['pattern']) {
      return `Please enter valid value for ${this.getFieldDisplayName(
        fieldName
      )}`;
    }

    return '';
  }

  getPasswordErrorMessage(fieldName: string): string {
    const control = this.getControl(fieldName);
    if (!control || !control.errors || !control.touched) return '';

    const errorMessage = this.getErrorMessage(fieldName);
    if (!!errorMessage) return errorMessage;

    const errorsMsg = [];
    if (control.errors['exactLength']) {
      errorsMsg.push(
        `${this.getFieldDisplayName(fieldName)} must be ${
          control.errors['exactLength'].requiredLength
        } characters`
      );
    }
    if (control.errors['requiresLetter']) {
      errorsMsg.push(
        `${this.getFieldDisplayName(fieldName)} requires at least 1 letter`
      );
    }

    if (control.errors['requiresSpecialChar']) {
      errorsMsg.push(
        `${this.getFieldDisplayName(
          fieldName
        )} requires at least 1 special character`
      );
    }
    return errorsMsg.reduce((prev, curr) => `${prev} ${curr} -`, '');
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      password: 'Password',
    };
    return displayNames[fieldName] || fieldName;
  }

  ngOnInit() {
    this.formSubscription = this.dataForm.valueChanges.subscribe((data) => {
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  submitHandler() {
    if (this.dataForm.valid) {
      console.log('Form submitted:', this.dataForm.value);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.dataForm.controls).forEach((key) => {
        this.dataForm.get(key)?.markAsTouched();
      });
    }
  }

  clearHandler() {
    this.dataForm.reset({
      subscription: this.initSubscriptionOption,
    });
  }
}
