import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FileInputComponent, SingleSelectComponent } from '@shared/components';
import { PrimaryTextInputComponent } from '@shared/components/primary-text-input/primary-text-input.component';
import {
  passwordValidator,
  strictFullNameValidator,
} from '@core/validators/form.validators';
import { DataFormErrorsComponent } from '../data-form-errors/data-form-errors.component';
import { ClearFormButtonComponent } from '../clear-form-button/clear-form-button.component';
import { DashboardDataService } from '@core/services/dashboard-data.service';
import { parseCSV } from '@core/utils/data.handler';
import { Router } from '@angular/router';

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
export class DataFormComponent {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private dashboardDataService = inject(DashboardDataService);

  subscriptionOptions = [
    { name: 'Basic', value: 'basic' },
    { name: 'Advanced', value: 'advanced' },
    { name: 'Pro', value: 'pro' },
  ];

  dataForm = this.formBuilder.group({
    name: [
      '',
      [
        strictFullNameValidator,
        Validators.minLength(2),
        Validators.maxLength(30),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    subscription: 'advance',
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
    if (!control || !control.errors || !control.touched) return '';
    return 'Field invalid';
  }

  submitHandler() {
    if (this.dataForm.valid) {
      const formValues = this.dataForm.value;
      const fileNestedField = this.dataForm.get('file.fileData');

      const tableDataText = fileNestedField ? fileNestedField.value || '' : '';
      this.dashboardDataService.setData({
        name: formValues['name'] || '',
        email: formValues['email'] || '',
        subscription: formValues['subscription'] || '',
        password: formValues['password'] || '',
        tableData: parseCSV(tableDataText),
      });
      this.router.navigate(['/dashboard']);
    } else {
      Object.keys(this.dataForm.controls).forEach((key) => {
        this.getControl(key)?.markAsTouched();
      });
    }
  }

  clearHandler() {
    this.dataForm.reset({
      name: '',
      email: '',
      subscription: this.initSubscriptionOption,
      password: '',
    });
  }
}
