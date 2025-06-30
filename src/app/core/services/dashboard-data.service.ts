import { Injectable } from '@angular/core';
import { DashboardData } from '@shared/interfaces/dashboard.interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardDataService {
  private dashboardData = new BehaviorSubject<DashboardData | null>(null);

  dataChange$: Observable<DashboardData | null> =
    this.dashboardData.asObservable();

  setData(data: DashboardData): void {
    this.dashboardData.next(data);
  }

  clearData(): void {
    this.dashboardData.next(null);
  }
}
