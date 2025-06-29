import { AfterViewInit, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SingleSelect } from '@shared/interfaces';

@Component({
  selector: 'app-single-select',
  imports: [],
  templateUrl: './single-select.component.html',
  styleUrl: './single-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SingleSelectComponent),
      multi: true,
    },
  ],
})
export class SingleSelectComponent
  implements ControlValueAccessor, AfterViewInit
{
  @Input({ required: true }) label!: string;
  @Input({ required: true }) options!: SingleSelect[];
  @Input() initSelectedValue: string = '';
  @Input() placeholder: string = 'Select an option';
  @Input() id: string = `selector-${Math.random()
    .toString(36)
    .slice(2, 9)
    .toString()}`;

  value: any = '';
  disabled: boolean = false;

  // ControlValueAccessor callbacks
  private onChange = (value: any) => {};
  private onTouched = () => {};

  ngAfterViewInit(): void {
    this.value = this.initSelectedValue;
    this.onChange(this.initSelectedValue);
  }

  onSelectionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.onChange(target.value);
  }

  onBlur(): void {
    this.onTouched();
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
