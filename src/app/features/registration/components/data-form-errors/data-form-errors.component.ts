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
    if (!control || !control.errors || !control.touched) return '';
    const { errors } = control;

    const errorsMsg = [];
    const displayName = this.getFieldDisplayName(fieldName);
    if (errors['required']) {
      errorsMsg.push(`${displayName} is required`);
    }

    if (errors['email']) {
      errorsMsg.push('Please enter a valid email address');
    }

    if (errors['minlength']) {
      errorsMsg.push(
        `${displayName} min length must be at least ${errors['minlength'].requiredLength} characters`
      );
    }

    if (errors['maxlength']) {
      errorsMsg.push(
        `${displayName} max length must be at least ${errors['maxlength'].requiredLength} characters`
      );
    }

    if (errors['pattern']) {
      errorsMsg.push(`Please enter valid value for ${displayName}`);
    }

    if (errors['fullName']) {
      errorsMsg.push(
        `${errors['fullName'].message}, actual value '${errors['fullName'].actualValue}'`
      );
    }

    if (errors['exactLength']) {
      errorsMsg.push(
        `${displayName} must be ${errors['exactLength'].requiredLength} characters, current ${errors['exactLength'].actualLength}`
      );
    }
    if (errors['requiresLetter']) {
      errorsMsg.push(`${displayName} requires at least 1 letter`);
    }

    if (errors['requiresSpecialChar']) {
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
