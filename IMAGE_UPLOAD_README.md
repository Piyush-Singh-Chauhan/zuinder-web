# Image Upload Feature

This update adds image upload functionality to the admin panel for both blog posts and portfolio items.

## Features Added

### 1. Image Upload API
- **Endpoint**: `/api/admin/upload`
- **Method**: POST
- **Authentication**: Admin token required
- **File Types**: JPEG, PNG, WebP
- **Max Size**: 5MB
- **Storage**: Local storage in `/public/uploads/`

### 2. ImageUpload Component
- **File Upload Only**: Direct file upload (URL input removed)
- **Drag & Drop**: Support for drag and drop file uploads
- **Preview**: Real-time image preview
- **Current Image Display**: Shows existing image when editing
- **Validation**: Client-side and server-side validation
- **Error Handling**: User-friendly error messages

### 3. Updated Forms
- **BlogForm**: Now uses ImageUpload component instead of simple URL input
- **PortfolioForm**: Now uses ImageUpload component instead of simple URL input

## How to Use

### For Blog Posts:
1. Go to Admin Panel → Blogs → Create New or Edit existing
2. In the Featured Image section:
   - Upload an image file from your computer
   - Use drag and drop to upload
3. Preview will show automatically
4. Save the blog post

### For Portfolio Items:
1. Go to Admin Panel → Portfolio → Add New or Edit existing
2. In the Project Image section:
   - Upload an image file from your computer
   - Use drag and drop to upload
3. Preview will show automatically
4. Save the portfolio item

## File Organization
- Uploaded files are stored in `/public/uploads/`
- Files are automatically renamed with timestamp and random string
- Uploaded files are excluded from git tracking
- `.gitkeep` file maintains the uploads directory structure

## Security Features
- Admin authentication required for uploads
- File type validation (images only)
- File size limits (5MB max)
- Unique file naming prevents conflicts
- Server-side validation backup

## Technical Details
- Uses Next.js File API for uploads
- FormData for file transmission
- Client-side validation for better UX
- Drag and drop with visual feedback
- Image preview with error handling