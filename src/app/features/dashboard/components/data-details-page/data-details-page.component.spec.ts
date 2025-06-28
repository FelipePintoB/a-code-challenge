import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDetailsPageComponent } from './data-details-page.component';

describe('DataDetailsPageComponent', () => {
  let component: DataDetailsPageComponent;
  let fixture: ComponentFixture<DataDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
