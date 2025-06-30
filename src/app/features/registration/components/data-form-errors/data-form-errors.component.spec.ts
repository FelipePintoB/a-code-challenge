import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormErrorsComponent } from './data-form-errors.component';

describe('DataFormErrorsComponent', () => {
  let component: DataFormErrorsComponent;
  let fixture: ComponentFixture<DataFormErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataFormErrorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataFormErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
