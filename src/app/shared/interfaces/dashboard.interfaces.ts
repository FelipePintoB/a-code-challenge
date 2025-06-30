export interface DashboardData {
  name: string;
  email: string;
  subscription: string;
  password: string;
  tableData: {
    columns: string[];
    rows: string[][];
  };
}
