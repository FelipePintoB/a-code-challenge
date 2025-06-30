import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-clear-form-modal',
  imports: [],
  templateUrl: './clear-form-modal.component.html',
  styleUrl: './clear-form-modal.component.css',
})
export class ClearFormModalComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Output() onSubmit = new EventEmitter<boolean>();

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  submit() {
    this.onSubmit.emit();
    this.close();
  }
}
