import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearFormButtonComponent } from './clear-form-button.component';

describe('ClearFormButtonComponent', () => {
  let component: ClearFormButtonComponent;
  let fixture: ComponentFixture<ClearFormButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClearFormButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClearFormButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
