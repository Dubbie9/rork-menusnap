# Architecture Overview

## System Architecture

MenuSnap follows a mobile-first architecture with clear separation between presentation, business logic, and data layers.

```
┌─────────────────────────────────────────────────────────────┐
│                      Mobile App (React Native)               │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │   Login    │→ │ Restaurants│→ │   Camera   │            │
│  └────────────┘  └────────────┘  └────────────┘            │
│                         ↓              ↓                     │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │   Upload   │← │  Provider  │  │  Services  │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                      Backend Services                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │  Airtable  │  │  Make.com  │  │ Google OCR │            │
│  │    API     │→ │  Webhook   │→ │   Vision   │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### 1. Authentication Layer
**File**: `app/index.tsx`

- Simple email/password authentication
- Form validation
- Navigation to main app after login
- State management for credentials

### 2. Restaurant Selection
**File**: `app/restaurants.tsx`

- Location-based grouping of restaurants
- Search functionality across all restaurants
- Visual cards with restaurant counts
- Selection passes context to upload flow

### 3. Camera Interface
**File**: `app/camera.tsx`

- Multi-photo capture capability
- Clean, minimal UI without overlay frames
- Photo review and deletion
- Batch upload preparation

### 4. Upload Management
**File**: `app/upload.tsx`

- Photo gallery preview
- Restaurant re-selection
- Metadata input (uploader name, date)
- Batch submission to backend

### 5. Success Confirmation
**File**: `app/success.tsx`

- Upload confirmation
- Navigation options (new upload, home)
- Clean completion state

## Data Flow

```
┌──────────┐
│  Login   │
└────┬─────┘
     │
     ↓
┌──────────────────┐
│   Select City    │
│  (London, NYC)   │
└────┬─────────────┘
     │
     ↓
┌──────────────────┐
│Select Restaurant │
│  (From List)     │
└────┬─────────────┘
     │
     ↓
┌──────────────────┐
│  Capture Photos  │
│  (Multi-Photo)   │
└────┬─────────────┘
     │
     ↓
┌──────────────────┐
│  Review & Edit   │
│  (Add Metadata)  │
└────┬─────────────┘
     │
     ↓
┌──────────────────┐
│     Submit       │
│   (To Backend)   │
└────┬─────────────┘
     │
     ↓
┌──────────────────┐
│Success & Confirm │
└──────────────────┘
```

## State Management

### MenuUploadProvider
**File**: `providers/MenuUploadProvider.tsx`

Manages global upload state:
- Selected restaurant
- Captured photos
- Upload metadata
- Form state persistence

Uses React Context + Hooks pattern for simple, predictable state flow.

## Data Models

### Restaurant
```typescript
interface Restaurant {
  id: string;
  name: string;
  location: string;
  address: string;
  contactInfo: string;
}
```

### MenuUpload
```typescript
interface MenuUpload {
  id: string;
  restaurantId: string;
  uploadDate: string;
  uploadedBy: string;
  images: string[];
  status: 'pending' | 'processing' | 'done';
  ocrTextResult?: string;
}
```

## Backend Integration

### Current State
Backend connections are currently disabled for development. The app uses mock data from:
- `mocks/restaurants.ts` - Sample restaurant data

### Planned Integration

**Airtable API**
- Base URL: `https://api.airtable.com/v0/{BASE_ID}`
- Tables:
  - `Restaurants`: Restaurant directory
  - `Menu Uploads`: Upload tracking
  - `Menu Items`: Extracted menu data

**Make.com Webhook**
- Triggered on upload completion
- Sends images to OCR service
- Returns structured data to Airtable

## Security Considerations

- Authentication tokens stored securely
- Image data transmitted over HTTPS
- No sensitive data in client-side storage
- API keys managed via environment variables

## Performance Optimizations

- Image compression before upload
- Lazy loading of restaurant lists
- Efficient search with memoization
- Minimal re-renders with React.memo

## Scalability

- Stateless architecture supports horizontal scaling
- Image processing offloaded to external services
- Database queries optimized with proper indexing
- CDN for static assets (future enhancement)

## Future Enhancements

1. **Offline Mode**: Queue uploads when network unavailable
2. **Image Preprocessing**: Auto-crop and enhance menu photos
3. **ML-Powered Suggestions**: Dish name standardization
4. **Real-time OCR**: Preview extracted text before submission
5. **Analytics Dashboard**: Track agent performance and upload metrics
