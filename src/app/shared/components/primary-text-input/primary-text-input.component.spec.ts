import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryTextInputComponent } from './primary-text-input.component';

describe('PrimaryTextInputComponent', () => {
  let component: PrimaryTextInputComponent;
  let fixture: ComponentFixture<PrimaryTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryTextInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaryTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
