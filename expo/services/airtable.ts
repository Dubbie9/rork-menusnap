import { Restaurant, MenuUpload } from '@/types/restaurant';
import { mockRestaurants } from '@/mocks/restaurants';

class AirtableService {
  async getRestaurants(): Promise<Restaurant[]> {
    // Return mock data for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockRestaurants);
      }, 500);
    });
  }

  async createMenuUpload(upload: MenuUpload): Promise<void> {
    // Mock upload - just log for now
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Mock upload created:', {
          restaurant: upload.restaurantId,
          photos: upload.photos.length,
          uploadedBy: upload.uploadedBy,
          date: upload.uploadDate,
          notes: upload.notes,
        });
        resolve();
      }, 1000);
    });
  }
}

export const airtableService = new AirtableService();