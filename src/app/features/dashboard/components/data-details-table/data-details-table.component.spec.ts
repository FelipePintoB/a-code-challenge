import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDetailsTableComponent } from './data-details-table.component';

describe('DataDetailsTableComponent', () => {
  let component: DataDetailsTableComponent;
  let fixture: ComponentFixture<DataDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataDetailsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
