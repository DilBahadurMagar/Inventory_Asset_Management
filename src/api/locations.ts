import { wrap, ApiError } from './helpers';
import { mockLocations } from '../data/mockData';
import type { Location } from '../types';

let locations = [...mockLocations];

export async function fetchLocations(search?: string): Promise<Location[]> {
  let result = [...locations];
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      l =>
        l.name.toLowerCase().includes(q) ||
        l.manager.toLowerCase().includes(q) ||
        l.address.toLowerCase().includes(q)
    );
  }
  return wrap(result);
}

export async function fetchLocationById(id: string): Promise<Location> {
  const loc = locations.find(l => l.id === id);
  if (!loc) throw new ApiError('Location not found', 404);
  return wrap(loc);
}

export async function createLocation(location: Location): Promise<Location> {
  locations = [location, ...locations];
  return wrap(location);
}

export async function updateLocation(location: Location): Promise<Location> {
  const idx = locations.findIndex(l => l.id === location.id);
  if (idx === -1) throw new ApiError('Location not found', 404);
  locations[idx] = location;
  return wrap(location);
}

export async function deleteLocation(id: string): Promise<{ success: boolean }> {
  const idx = locations.findIndex(l => l.id === id);
  if (idx === -1) throw new ApiError('Location not found', 404);
  locations.splice(idx, 1);
  return wrap({ success: true });
}
