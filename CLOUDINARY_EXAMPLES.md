# Cloudinary Usage Examples

## Basic Image Upload Examples

### 1. Single Image Upload (Already Working)
```jsx
// This is how your current forms work
import ImageUpload from '@/components/admin/ImageUpload';

function BlogForm() {
  const [formData, setFormData] = useState({
    image: ''
  });

  return (
    <ImageUpload
      currentImage={formData.image}
      onImageChange={(url) => setFormData({...formData, image: url})}
      label="Featured Image"
      required
    />
  );
}
```

### 2. Multiple Image Upload
```jsx
// For gallery or multiple images per item
import { useState } from 'react';

function MultipleImageUpload({ onImagesChange, currentImages = [] }) {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState(currentImages);

  const handleMultipleUpload = async (files) => {
    setUploading(true);
    const formData = new FormData();
    
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('/api/admin/upload/multiple', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        const newImages = [...images, ...data.urls];
        setImages(newImages);
        onImagesChange(newImages);
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleMultipleUpload(e.target.files)}
        disabled={uploading}
      />
      
      <div className="grid grid-cols-3 gap-4">
        {images.map((url, index) => (
          <div key={index} className="relative">
            <img src={url} alt={`Upload ${index}`} className="w-full h-32 object-cover rounded" />
            <button
              onClick={() => {
                const newImages = images.filter((_, i) => i !== index);
                setImages(newImages);
                onImagesChange(newImages);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Advanced Cloudinary Features

### 3. Dynamic Image Transformations
```jsx
import { getTransformedUrl } from '@/lib/cloudinary';

function ResponsiveImage({ src, alt, className }) {
  // Generate different sizes for responsive images
  const thumbnail = getTransformedUrl(src, { width: 300, height: 200, crop: 'fill' });
  const medium = getTransformedUrl(src, { width: 600, height: 400, crop: 'fill' });
  const large = getTransformedUrl(src, { width: 1200, height: 800, crop: 'limit' });

  return (
    <picture>
      <source media="(max-width: 640px)" srcSet={thumbnail} />
      <source media="(max-width: 1024px)" srcSet={medium} />
      <img src={large} alt={alt} className={className} />
    </picture>
  );
}
```

### 4. Image with Lazy Loading and Optimizations
```jsx
function OptimizedImage({ src, alt, width, height, className }) {
  // Auto-optimize for modern browsers
  const optimizedUrl = getTransformedUrl(src, {
    width,
    height,
    crop: 'fill',
    quality: 'auto',
    format: 'auto' // Will serve WebP/AVIF when supported
  });

  return (
    <img
      src={optimizedUrl}
      alt={alt}
      className={className}
      loading="lazy" // Native lazy loading
      decoding="async"
    />
  );
}
```

## Database Schema Examples

### 5. Extended Blog Model with Gallery
```javascript
// If you want to add multiple images to blogs
const blogSchema = new mongoose.Schema({
  // ... existing fields
  image: {
    type: String,
    required: [true, "Featured image is required"],
  },
  gallery: [{
    type: String, // Array of Cloudinary URLs
  }],
  // ... rest of schema
});
```

### 6. Portfolio with Multiple Project Images
```javascript
// Enhanced portfolio model
const portfolioSchema = new mongoose.Schema({
  // ... existing fields
  image: {
    type: String,
    required: [true, "Main image is required"],
  },
  projectImages: [{
    url: String,
    caption: {
      en: String,
      pt: String
    }
  }],
  // ... rest of schema
});
```

## API Integration Examples

### 7. Enhanced Blog API with Gallery Support
```javascript
// In your blog route.js
export async function POST(req) {
  try {
    await verifyAdmin(req);
    await connectDB();
    
    const blogData = await req.json();
    const { gallery, ...restData } = blogData;

    // Validate main image
    if (!restData.image) {
      return NextResponse.json(
        { success: false, message: "Featured image is required" },
        { status: 400 }
      );
    }

    // Create blog with gallery
    const newBlog = await Blog.create({
      ...restData,
      gallery: gallery || []
    });

    return NextResponse.json({
      success: true,
      message: "Blog created successfully",
      data: newBlog
    });

  } catch (error) {
    // ... error handling
  }
}
```

### 8. Image Cleanup for Gallery Images
```javascript
// Enhanced delete route with gallery cleanup
export async function DELETE(req, { params }) {
  try {
    await verifyAdmin(req);
    await connectDB();
    
    const { id } = params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // Delete main image
    if (blog.image && blog.image.includes('cloudinary.com')) {
      await deleteFromCloudinary(blog.image);
    }

    // Delete gallery images
    if (blog.gallery && blog.gallery.length > 0) {
      const galleryUrls = blog.gallery.filter(url => url.includes('cloudinary.com'));
      if (galleryUrls.length > 0) {
        await deleteMultipleFromCloudinary(galleryUrls);
      }
    }

    await Blog.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Blog and all images deleted successfully"
    });

  } catch (error) {
    // ... error handling
  }
}
```

## Frontend Display Examples

### 9. Blog Card with Optimized Image
```jsx
function BlogCard({ blog }) {
  const thumbnailUrl = getTransformedUrl(blog.image, {
    width: 400,
    height: 250,
    crop: 'fill',
    quality: 'auto'
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={thumbnailUrl}
        alt={blog.title.en}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{blog.title.en}</h3>
        <p className="text-gray-600 mt-2">{blog.description.en}</p>
      </div>
    </div>
  );
}
```

### 10. Portfolio Gallery with Lightbox
```jsx
import { useState } from 'react';

function PortfolioGallery({ portfolio }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const mainImage = getTransformedUrl(portfolio.image, {
    width: 800,
    height: 600,
    crop: 'fill'
  });

  const thumbnails = portfolio.projectImages?.map(img => 
    getTransformedUrl(img.url, { width: 200, height: 150, crop: 'fill' })
  ) || [];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <img
        src={mainImage}
        alt={portfolio.title.en}
        className="w-full h-96 object-cover rounded-lg cursor-pointer"
        onClick={() => setSelectedImage(portfolio.image)}
      />

      {/* Thumbnail Gallery */}
      {thumbnails.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {portfolio.projectImages.map((img, index) => (
            <img
              key={index}
              src={thumbnails[index]}
              alt={img.caption?.en || ''}
              className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80"
              onClick={() => setSelectedImage(img.url)}
            />
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={getTransformedUrl(selectedImage, { width: 1200, quality: 'auto' })}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
```

## Performance Optimizations

### 11. Preload Important Images
```jsx
import { useEffect } from 'react';

function HomePage({ featuredBlogs }) {
  useEffect(() => {
    // Preload featured blog images
    featuredBlogs.forEach(blog => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = getTransformedUrl(blog.image, { width: 400, height: 250 });
      document.head.appendChild(link);
    });
  }, [featuredBlogs]);

  return (
    // ... component JSX
  );
}
```

### 12. Image Placeholder with Blur Effect
```jsx
function ImageWithPlaceholder({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);
  
  const blurUrl = getTransformedUrl(src, {
    width: 40,
    height: 30,
    crop: 'fill',
    quality: 10,
    blur: 1000
  });

  const fullUrl = getTransformedUrl(src, {
    width: 600,
    height: 400,
    quality: 'auto'
  });

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      <img
        src={blurUrl}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      
      {/* Main image */}
      <img
        src={fullUrl}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  );
}
```

## Error Handling Examples

### 13. Robust Image Component with Fallback
```jsx
function RobustImage({ src, alt, fallback = '/placeholder-image.svg', ...props }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const imageUrl = error ? fallback : (src?.includes('cloudinary.com') ? src : fallback);

  return (
    <img
      src={imageUrl}
      alt={alt}
      onLoad={() => setLoading(false)}
      onError={() => {
        setError(true);
        setLoading(false);
      }}
      className={`${loading ? 'opacity-50' : 'opacity-100'} transition-opacity`}
      {...props}
    />
  );
}
```

These examples show how to leverage your existing Cloudinary integration for more advanced use cases while maintaining the simplicity of your current implementation.