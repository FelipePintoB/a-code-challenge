import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClearFormModalComponent } from '../clear-form-modal/clear-form-modal.component';

@Component({
  selector: 'app-clear-form-button',
  imports: [ClearFormModalComponent],
  templateUrl: './clear-form-button.component.html',
  styleUrl: './clear-form-button.component.css',
})
export class ClearFormButtonComponent {
  @Input() isDisabled = false;
  @Output() clearHandler = new EventEmitter<boolean>();

  isModalOpened = false;

  openConfirmationModal() {
    this.isModalOpened = true;
  }

  onClearHandler() {
    this.clearHandler.emit(true);
  }
}
