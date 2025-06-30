import { Component, inject } from '@angular/core';
import { DashboardDataService } from '@core/services/dashboard-data.service';

@Component({
  selector: 'app-data-details-table',
  imports: [],
  templateUrl: './data-details-table.component.html',
  styleUrl: './data-details-table.component.css',
})
export class DataDetailsTableComponent {
  dashboardDataService = inject(DashboardDataService);
}
