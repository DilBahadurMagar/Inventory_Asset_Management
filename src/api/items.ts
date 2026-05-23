import { wrap, ApiError } from './helpers';
import { mockItems } from '../data/mockData';
import type { InventoryItem, ItemStatus, ItemCategory } from '../types';

let items = [...mockItems];

export async function fetchItems(filters?: {
  search?: string;
  status?: ItemStatus | '';
  category?: ItemCategory | '';
  page?: number;
  pageSize?: number;
  sortKey?: string;
  sortDir?: 'asc' | 'desc';
}): Promise<{ items: InventoryItem[]; total: number }> {
  let result = [...items];

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      i =>
        i.name.toLowerCase().includes(q) ||
        i.assetId.toLowerCase().includes(q) ||
        i.serialNumber.toLowerCase().includes(q) ||
        i.locationName.toLowerCase().includes(q) ||
        i.assignedTo.toLowerCase().includes(q)
    );
  }

  if (filters?.status) {
    result = result.filter(i => i.status === filters.status);
  }

  if (filters?.category) {
    result = result.filter(i => i.category === filters.category);
  }

  if (filters?.sortKey) {
    const key = filters.sortKey as keyof InventoryItem;
    const dir = filters.sortDir ?? 'asc';
    result.sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      const cmp = typeof av === 'number' && typeof bv === 'number'
        ? av - bv
        : String(av).localeCompare(String(bv));
      return dir === 'asc' ? cmp : -cmp;
    });
  }

  const total = result.length;

  if (filters?.page && filters?.pageSize) {
    const start = (filters.page - 1) * filters.pageSize;
    result = result.slice(start, start + filters.pageSize);
  }

  return wrap({ items: result, total });
}

export async function fetchItemById(id: string): Promise<InventoryItem> {
  const item = items.find(i => i.id === id);
  if (!item) throw new ApiError('Item not found', 404);
  return wrap(item);
}

export async function createItem(item: InventoryItem): Promise<InventoryItem> {
  items = [item, ...items];
  return wrap(item);
}

export async function updateItem(item: InventoryItem): Promise<InventoryItem> {
  const idx = items.findIndex(i => i.id === item.id);
  if (idx === -1) throw new ApiError('Item not found', 404);
  items[idx] = item;
  return wrap(item);
}

export async function deleteItem(id: string): Promise<{ success: boolean }> {
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) throw new ApiError('Item not found', 404);
  items.splice(idx, 1);
  return wrap({ success: true });
}
