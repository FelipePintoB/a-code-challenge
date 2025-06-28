import { Component } from '@angular/core';
import { DataFormComponent } from '../data-form/data-form.component';

@Component({
  selector: 'app-data-registration-page',
  standalone: true,
  imports: [DataFormComponent],
  templateUrl: './data-registration-page.component.html',
  styleUrl: './data-registration-page.component.css',
})
export class DataRegistrationPageComponent {}
