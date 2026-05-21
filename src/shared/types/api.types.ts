export interface ApiResponse {
  success: boolean;
  status: number;
  statusText: string;
  data: any;
  duration: number;
  size: number;
  error?: string;
}