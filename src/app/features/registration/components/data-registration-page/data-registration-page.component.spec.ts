import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRegistrationPageComponent } from './data-registration-page.component';

describe('DataRegistrationPageComponent', () => {
  let component: DataRegistrationPageComponent;
  let fixture: ComponentFixture<DataRegistrationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataRegistrationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataRegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
