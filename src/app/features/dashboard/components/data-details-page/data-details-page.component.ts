import { Component, inject } from '@angular/core';
import { DashboardDataService } from '@core/services/dashboard-data.service';

@Component({
  selector: 'app-data-details-page',
  imports: [],
  standalone: true,
  templateUrl: './data-details-page.component.html',
  styleUrl: './data-details-page.component.css',
})
export class DataDetailsPageComponent {
  dashboardDataService = inject(DashboardDataService);
}
