import { Injectable, Signal, signal } from '@angular/core';
import { DashboardData } from '@shared/interfaces/dashboard.interfaces';

@Injectable({
  providedIn: 'root',
})
export class DashboardDataService {
  private readonly initialState: DashboardData = {
    name: '',
    email: '',
    subscription: '',
    password: '',
    tableData: {
      columns: [],
      rows: [],
    },
  };

  private state = signal<DashboardData>(this.initialState);

  readonly $state: Signal<DashboardData> = this.state.asReadonly();

  setState(newState: Partial<DashboardData>): void {
    this.state.update((current) => ({
      ...current,
      ...newState,
    }));
  }

  clearState(): void {
    this.state.set(this.initialState);
  }
}
