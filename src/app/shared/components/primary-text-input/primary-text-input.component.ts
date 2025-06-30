import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-primary-text-input',
  imports: [],
  templateUrl: './primary-text-input.component.html',
  styleUrl: './primary-text-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimaryTextInputComponent),
      multi: true,
    },
  ],
})
export class PrimaryTextInputComponent implements ControlValueAccessor {
  @Input() control: FormControl | null = null;
  @Input({ required: true }) label: string = '';
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() id: string = `input-${Math.random()
    .toString(36)
    .slice(2, 9)
    .toString()}`;
  @Input() errorMessage: string = '';

  value = '';
  disabled = false;

  timeoutId: any;

  get isTouched(): boolean {
    return !!this.control?.touched;
  }

  // ControlValueAccessor callback functions
  private onChange = (value: string) => {};
  private onTouched = () => {};

  get inputClasses(): string {
    let classes = 'custom-input';
    if (this.errorMessage && this.isTouched) {
      classes += ' error';
    }
    return classes;
  }

  // ControlValueAccessor interface methods
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Event handlers
  onInput(event: Event): void {
    clearTimeout(this.timeoutId);
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.timeoutId = setTimeout(() => {
      this.onChange(this.value);
    }, 400);
  }

  onBlur(): void {
    this.onTouched();
  }
}
