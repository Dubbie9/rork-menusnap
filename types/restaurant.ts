export interface Restaurant {
  id: string;
  name: string;
  location: string;
  contactInfo?: string;
}

export interface MenuUpload {
  restaurantId: string;
  uploadedBy: string;
  uploadDate: string;
  notes?: string;
  photos: string[];
}