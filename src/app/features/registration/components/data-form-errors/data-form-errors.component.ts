import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-form-errors',
  imports: [],
  templateUrl: './data-form-errors.component.html',
  styleUrl: './data-form-errors.component.css',
})
export class DataFormErrorsComponent {
  @Input({ required: true }) dataForm: FormGroup | null = null;
  displayNamesObj: { [key: string]: string } = {
    name: 'First and last name',
    email: 'Email',
    password: 'Password',
  };

  get displayNamesArray() {
    return Object.keys(this.displayNamesObj);
  }

  getControl(fieldName: string) {
    if (!this.dataForm) return null;
    return this.dataForm.get(fieldName) as FormControl | null;
  }

  getErrorMessage(fieldName: string): string {
    const control = this.getControl(fieldName);
    if (!control || !control.errors || !control.touched || !control.dirty)
      return '';

    const errorsMsg = [];
    if (control.errors['required']) {
      errorsMsg.push(`${this.getFieldDisplayName(fieldName)} is required`);
    }

    if (control.errors['email']) {
      errorsMsg.push('Please enter a valid email address');
    }

    if (control.errors['minlength']) {
      errorsMsg.push(
        `${this.getFieldDisplayName(fieldName)} min length must be at least ${
          control.errors['minlength'].requiredLength
        } characters`
      );
    }

    if (control.errors['maxlength']) {
      errorsMsg.push(
        `${this.getFieldDisplayName(fieldName)} max length must be at least ${
          control.errors['maxlength'].requiredLength
        } characters`
      );
    }

    if (control.errors['pattern']) {
      errorsMsg.push(
        `Please enter valid value for ${this.getFieldDisplayName(fieldName)}`
      );
    }

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
    return errorsMsg.reduce((prev, curr) => {
      return `${prev} * ${curr} \n`;
    }, '');
  }

  private getFieldDisplayName(fieldName: string): string {
    return this.displayNamesObj[fieldName] || fieldName;
  }
}
