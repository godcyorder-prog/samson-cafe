export interface MenuItem {
  id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
  category: string;
  available: boolean;
}

export interface MenuResponse {
  success: boolean;
  items: MenuItem[];
}

export interface CategoriesResponse {
  success: boolean;
  categories: string[];
}

export interface OrderItem {
  id: string;
  qty: number;
}

export interface Customer {
  name: string;
  phone: string;
  orderType: "Dine-in" | "Takeaway" | "Delivery";
  address: string;
  notes: string;
}

export interface OrderRequest {
  customer: Customer;
  items: OrderItem[];
}

export interface OrderLine {
  id: string;
  name: string;
  qty: number;
  price: number;
  lineTotal: number;
}

export interface OrderResponse {
  success: boolean;
  orderId?: string;
  total?: number;
  lines?: OrderLine[];
  message?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function parseResponse(res: Response): Promise<unknown> {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new ApiError(
      "Could not read the server response. Check that NEXT_PUBLIC_API_URL is correct and the Apps Script deployment is public."
    );
  }
}

export async function getMenu(): Promise<MenuItem[]> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}?action=menu`);
  } catch {
    throw new ApiError("Network error. Check your internet connection.");
  }
  const data = (await parseResponse(res)) as MenuResponse;
  if (!data.success) {
    throw new ApiError("Failed to load menu. Please try again.");
  }
  return data.items;
}

export async function getCategories(): Promise<string[]> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}?action=categories`);
  } catch {
    throw new ApiError("Network error. Check your internet connection.");
  }
  const data = (await parseResponse(res)) as CategoriesResponse;
  if (!data.success) {
    throw new ApiError("Failed to load categories. Please try again.");
  }
  return data.categories;
}

export async function placeOrder(order: OrderRequest): Promise<OrderResponse> {
  let res: Response;
  try {
    res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(order),
    });
  } catch {
    throw new ApiError("Network error. Check your internet connection.");
  }
  const data = (await parseResponse(res)) as OrderResponse;
  return data;
}
