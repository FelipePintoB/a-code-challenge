import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file-input',
  imports: [],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.css',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class FileInputComponent implements OnInit, OnDestroy {
  @Input({ required: true }) buttonLabel!: string;
  @Input({ required: true }) groupName!: string;

  private formBuilder = inject(FormBuilder);
  private controlContainer = inject(ControlContainer);

  ngOnInit(): void {
    this.parentFormGroup.addControl(
      this.groupName,
      this.formBuilder.group({
        fileName: null,
        fileData: null,
      })
    );
  }

  ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.groupName);
  }

  get parentFormGroup() {
    return this.controlContainer.control as FormGroup;
  }

  get currentFormGroup() {
    return this.parentFormGroup.get(this.groupName);
  }

  get fileName() {
    if (!this.currentFormGroup) return '';
    return this.currentFormGroup?.get('fileName')?.value || '';
  }

  uploadFileHandler(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files: FileList | null = inputElement.files;

    if (files && files.length > 0) {
      const selectedFile: File = files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const csvContent = e.target.result;
        if (!this.currentFormGroup) return;
        this.currentFormGroup.setValue({
          fileName: selectedFile.name,
          fileData: csvContent,
        });
      };

      reader.readAsText(selectedFile);
    }
  }
}
