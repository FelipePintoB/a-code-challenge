import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return null; // Let required validator handle empty values
  }

  const errors: ValidationErrors = {};

  // Check minimum length (8 characters)
  if (value.length !== 8) {
    errors['exactLength'] = { requiredLength: 8, actualLength: value.length };
  }

  // Check for at least one letter
  if (!/[a-zA-Z]/.test(value)) {
    errors['requiresLetter'] = true;
  }

  // Check for at least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
    errors['requiresSpecialChar'] = true;
  }

  return Object.keys(errors).length > 0 ? errors : null;
}
