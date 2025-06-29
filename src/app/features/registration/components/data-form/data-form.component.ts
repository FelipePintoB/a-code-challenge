import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileInputComponent, SingleSelectComponent } from '@shared/components';
import { PrimaryTextInputComponent } from '@shared/components/primary-text-input/primary-text-input.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-form',
  imports: [
    ReactiveFormsModule,
    PrimaryTextInputComponent,
    SingleSelectComponent,
    FileInputComponent,
  ],
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
    subscription: ['', [Validators.required]],
    password: ['', [Validators.required]],
    fileUrl: ['', [Validators.required]],
  });

  get initSubscriptionOption() {
    return this.subscriptionOptions[1].value;
  }

  ngOnInit() {
    this.formSubscription = this.dataForm.valueChanges.subscribe((data) => {
      console.log(data);
    });
  }

  // ngAfterViewInit(): void {
  //   this.dataForm.patchValue({
  //     subscription: this.initSubscriptionOption,
  //   });
  // }

  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  submitHandler() {
    console.log('Submitted');
  }

  clearHandler() {
    this.dataForm.reset({
      subscription: this.initSubscriptionOption,
    });
  }
}
