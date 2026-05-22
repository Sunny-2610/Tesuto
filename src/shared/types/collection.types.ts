export interface Collection {
  id: string;
  name: string;
  requests: StoredRequest[];
}

export interface StoredRequest {
  id: string;
  name: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  body: any;
  createdAt: number;
}