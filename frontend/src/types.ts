export interface HealthResponse {
  status: string;
}

export interface Store {
  id: number;
  name: string;
  address: string;
  open_time: string;
  close_time: string;
}

export interface Product {
  id: number;
  name: string;
  location_label: string;
  inventory_status: string;
  price: number;
}

export interface Deal {
  id: number;
  name: string;
  campaign_title: string;
  point_amount: number;
  location_label: string;
}
