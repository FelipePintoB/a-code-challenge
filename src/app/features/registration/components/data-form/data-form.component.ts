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
import { DataFormErrorsComponent } from '../data-form-errors/data-form-errors.component';
import { ClearFormButtonComponent } from '../clear-form-button/clear-form-button.component';

@Component({
  selector: 'app-data-form',
  imports: [
    ReactiveFormsModule,
    PrimaryTextInputComponent,
    SingleSelectComponent,
    FileInputComponent,
    DataFormErrorsComponent,
    ClearFormButtonComponent,
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
        Validators.maxLength(30),
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

  get hasFormErrors() {
    return Object.keys(this.dataForm.controls).some((key) => {
      return this.getControl(key)?.errors;
    });
  }

  getControl(fieldName: string) {
    return this.dataForm.get(fieldName) as FormControl | null;
  }

  getErrorWarn(fieldName: string): string {
    const control = this.getControl(fieldName);
    if (!control || !control.errors || !control.touched || !control.dirty)
      return '';
    return 'Field invalid';
  }

  ngOnInit() {
    this.formSubscription = this.dataForm.valueChanges.subscribe((data) => {
      // console.log(data);
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
        this.getControl(key)?.markAsTouched();
      });
    }
  }

  clearHandler() {
    this.dataForm.reset({
      subscription: this.initSubscriptionOption,
    });
    this.dataForm.markAsPristine();
  }
}
