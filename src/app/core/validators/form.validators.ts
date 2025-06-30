import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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

export function strictFullNameValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (!control.value || typeof control.value !== 'string') {
    return null;
  }

  const value = control.value.trim();

  const nameParts = value.split(/\s+/).filter((part) => part.length > 0);

  if (nameParts.length < 2) {
    return {
      fullName: {
        message: 'Please enter both first and last name',
        actualValue: value,
      },
    };
  }

  // Check if each part contains only letters (including accented characters)
  const letterPattern =
    /^[a-zA-ZÀ-ÿ\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF'-]+$/;

  for (const part of nameParts) {
    if (part.length < 2) {
      return {
        fullName: {
          message: 'Please enter correct name part',
          actualValue: part,
        },
      };
    }
    if (!letterPattern.test(part)) {
      return {
        fullName: {
          message: 'Part name should contain only letters',
          actualValue: part,
        },
      };
    }
  }

  return null;
}
