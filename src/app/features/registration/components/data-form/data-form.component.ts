import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-form',
  imports: [ReactiveFormsModule],
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.css',
})
export class DataFormComponent implements OnInit, OnDestroy {
  private formBuilder = inject(FormBuilder);
  private formSubscription!: Subscription;

  subscriptionOptions = [
    { name: 'Basic', value: 'basic' },
    { name: 'Advanced', value: 'advanced' },
    { name: 'Pro', value: 'pro' },
  ];

  dataForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.email]],
    subscription: [this.subscriptionOptions[1].value, [Validators.required]],
    password: ['', [Validators.required]],
    fileUrl: ['', [Validators.required]],
  });

  ngOnInit() {
    this.formSubscription = this.dataForm.valueChanges.subscribe((data) => {
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  submitHandler() {
    console.log('Submitted');
  }

  clearHandler() {
    console.log('Clear handler');
  }

  uploadFileHandler(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files: FileList | null = inputElement.files;
    console.log({ event, files });

    if (files && files.length > 0) {
      const selectedFile: File = files[0];
      const reader = new FileReader();
      console.log(selectedFile.name);
      console.log(selectedFile.type);

      reader.onload = (e: any) => {
        const csvContent = e.target.result;
        console.log(csvContent);
        // this.parseCsvData(csvContent);
      };

      reader.readAsText(selectedFile);
    }
  }
}
