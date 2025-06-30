import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  private router = inject(Router);

  goBack() {
    this.dashboardDataService.clearState();
    this.router.navigate(['']);
  }
}
