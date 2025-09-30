# Image Upload on Form Submission

## Overview

This update modifies the image upload behavior to only upload images to Cloudinary when the form is submitted (Create/Update), rather than immediately when an image is selected. This provides better user experience and prevents unnecessary uploads.

## Changes Made

### 1. ImageUpload Component (`/src/components/admin/ImageUpload.jsx`)

**Before:** Images were uploaded immediately when selected
**After:** Images are stored locally and only uploaded when form is submitted

Key changes:
- Removed automatic upload to `/api/admin/upload`
- Store selected file as File object instead of uploading immediately
- Create preview using `URL.createObjectURL()`
- Clean up object URLs to prevent memory leaks

### 2. Form Components

#### BlogForm (`/src/components/admin/BlogForm.jsx`)
- Added Cloudinary upload logic in `handleSubmit`
- Check if `formData.image` is a File object
- If so, upload to Cloudinary before submitting form data
- Use returned Cloudinary URL in API request

#### PortfolioForm (`/src/components/admin/PortfolioForm.jsx`)
- Added Cloudinary upload logic in `handleSubmit`
- Same pattern as BlogForm

#### ServiceForm (`/src/components/admin/ServiceForm.jsx`)
- Added Cloudinary upload logic in `handleSubmit`
- Same pattern as BlogForm

## How It Works

### Image Selection Flow:
1. User selects an image file
2. File is stored locally in component state as a File object
3. Preview is generated using `URL.createObjectURL()`
4. No upload to Cloudinary happens yet

### Form Submission Flow:
1. User clicks "Create" or "Update"
2. Form validates all fields
3. If `formData.image` is a File object:
   - Upload to Cloudinary via `/api/admin/upload`
   - Get Cloudinary URL from response
4. Submit form data with Cloudinary URL to API

### Benefits:
- ✅ Images only uploaded when form is submitted
- ✅ Better user experience (can change image before submitting)
- ✅ Reduced unnecessary Cloudinary usage
- ✅ Proper error handling for upload failures
- ✅ Memory leak prevention with URL cleanup

## Technical Implementation

### ImageUpload Component Changes:
```javascript
// Before - immediate upload
const handleFileUpload = async (event) => {
  // ... validation
  // Upload immediately
  const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
  // Set URL in parent state
}

// After - deferred upload
const handleFileSelect = async (event) => {
  // ... validation
  // Store file locally and create preview
  const previewUrl = URL.createObjectURL(file);
  setImagePreview(previewUrl);
  setSelectedFile(file);
  // Pass file object to parent (not URL)
  onImageChange(file);
}
```

### Form Component Changes:
```javascript
// In handleSubmit function
let imageUrl = formData.image;

// If image is a File object, upload it first
if (formData.image instanceof File) {
  const formDataToUpload = new FormData();
  formDataToUpload.append("file", formData.image);
  
  const uploadResponse = await fetch("/api/admin/upload", {
    method: "POST",
    body: formDataToUpload,
  });
  
  const uploadData = await uploadResponse.json();
  
  if (uploadData.success) {
    imageUrl = uploadData.url;
  } else {
    // Handle upload error
    return;
  }
}

// Use Cloudinary URL in API request
const apiData = {
  ...formData,
  image: imageUrl
};
```

## User Experience Improvements

1. **No Immediate Uploads:** Images are not uploaded until user explicitly submits the form
2. **Preview Available:** Users can still see image preview immediately after selection
3. **Easy to Change:** Users can select a different image before submitting
4. **Clear Feedback:** Error messages for upload failures during submission
5. **Memory Efficient:** Proper cleanup of object URLs

## Error Handling

The system now handles:
- Upload failures during form submission
- Network errors
- Cloudinary API errors
- Validation errors
- File type/size validation
- **Type errors** (File objects vs strings in validation)

## Recent Fixes

Fixed a runtime error where validation functions were trying to call `.trim()` on File objects:

```javascript
// Before - caused errors when value was a File object
if (!value.trim()) return "Image is required";

// After - handles both File objects and string URLs
if (!value || (typeof value === 'string' && !value.trim()) || (value instanceof File && !value.name)) {
  return "Image is required";
}
```

## Backward Compatibility

This change is fully backward compatible:
- Existing images (already Cloudinary URLs) work without changes
- Editing existing items works the same way
- No database schema changes required
- No API endpoint changes required

## Testing

To test this implementation:
1. Create new blog/portfolio/service
2. Select an image
3. Verify preview shows correctly
4. Change image before submitting
5. Submit form
6. Verify image uploads to Cloudinary and saves URL to database
7. Check that existing items still work correctly