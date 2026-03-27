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

# Changelog

All notable changes to MenuSnap will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Offline mode for photo capture
- Real-time OCR preview
- Image preprocessing and enhancement
- Analytics dashboard
- Multi-language support

---

## [0.2.0] - 2026-01-13

### Added
- Location-based restaurant grouping with visual cards
- Restaurant count badges per location
- Real-time search functionality across all restaurants
- Multi-photo capture capability in camera view
- Photo preview gallery before submission
- Delete individual photos from upload batch
- Edit restaurant selection from upload page
- Professional white and dark blue color scheme
- Optimized mobile-first UI layout
- Single-page upload review screen

### Changed
- Removed camera overlay frame for cleaner capture experience
- Improved font sizing for better readability
- Reduced border radius for more professional appearance
- Optimized login page layout for mobile
- Updated all screens to fit content without scrolling when possible
- Refined spacing and padding throughout app

### Removed
- Backend connections (temporary, for development)
- Page headings from top of screens
- Camera viewfinder frame overlay

### Fixed
- Login form width optimization
- Upload page layout to fit single screen
- Typography consistency across screens
- Color scheme standardization

---

## [0.1.0] - 2026-01-10

### Added
- Initial app structure with Expo Router
- Basic authentication screen
- Restaurant selection from list
- Camera integration for menu capture
- Single photo upload functionality
- Success confirmation screen
- MenuUploadProvider for state management
- Airtable service integration (prepared)
- Mock restaurant data for development
- TypeScript strict mode configuration
- Custom color constants
- Professional app icon and splash screen

### Infrastructure
- React Native + Expo SDK 53 setup
- TypeScript configuration
- File-based routing with Expo Router
- Project structure and organization
- Development environment configuration

---

## Release Notes

### v0.2.0 - "Professional Refinement"
This release focuses on UI/UX improvements and workflow optimization. The app now features a cleaner, more professional design with improved navigation and multi-photo capabilities. Location-based browsing makes finding restaurants faster and more intuitive.

**Upgrade Notes**: No breaking changes. This is a safe upgrade from v0.1.0.

### v0.1.0 - "Foundation"
First working version of MenuSnap with core functionality: authentication, restaurant selection, camera capture, and upload preparation. Includes mock data for development and testing.

---

## Version History

- **0.2.0** (2026-01-13): Professional UI refinement and feature enhancements
- **0.1.0** (2026-01-10): Initial release with core functionality

---

[Unreleased]: https://github.com/yourusername/menusnap/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/yourusername/menusnap/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/yourusername/menusnap/releases/tag/v0.1.0
