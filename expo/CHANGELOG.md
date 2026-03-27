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
