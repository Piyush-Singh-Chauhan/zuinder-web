import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Extract public ID from Cloudinary URL
 * @param {string} cloudinaryUrl - Full Cloudinary URL
 * @returns {string|null} - Public ID or null if invalid URL
 */
export function extractPublicId(cloudinaryUrl) {
  if (!cloudinaryUrl || typeof cloudinaryUrl !== 'string') {
    return null;
  }

  // Check if it's a Cloudinary URL
  if (!cloudinaryUrl.includes('cloudinary.com')) {
    return null;
  }

  try {
    // Pattern: https://res.cloudinary.com/cloud-name/image/upload/v1234567890/folder/public-id.format
    const match = cloudinaryUrl.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
    return match ? match[1] : null;
  } catch (error) {
    console.error('Error extracting public ID:', error);
    return null;
  }
}

/**
 * Delete image from Cloudinary
 * @param {string} publicIdOrUrl - Public ID or full Cloudinary URL
 * @returns {Promise<boolean>} - Success status
 */
export async function deleteFromCloudinary(publicIdOrUrl) {
  try {
    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.warn('Cloudinary not configured, skipping deletion');
      return false;
    }

    let publicId = publicIdOrUrl;

    // If it's a full URL, extract the public ID
    if (publicIdOrUrl.includes('cloudinary.com')) {
      publicId = extractPublicId(publicIdOrUrl);
      if (!publicId) {
        console.error('Could not extract public ID from URL:', publicIdOrUrl);
        return false;
      }
    }

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok') {
      console.log('Successfully deleted from Cloudinary:', publicId);
      return true;
    } else {
      console.warn('Cloudinary deletion result:', result);
      return false;
    }

  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return false;
  }
}

/**
 * Delete multiple images from Cloudinary
 * @param {string[]} publicIdsOrUrls - Array of public IDs or URLs
 * @returns {Promise<{success: number, failed: number, results: object[]}>}
 */
export async function deleteMultipleFromCloudinary(publicIdsOrUrls) {
  const results = [];
  let successCount = 0;
  let failedCount = 0;

  for (const item of publicIdsOrUrls) {
    try {
      const success = await deleteFromCloudinary(item);
      results.push({ item, success });
      if (success) {
        successCount++;
      } else {
        failedCount++;
      }
    } catch (error) {
      results.push({ item, success: false, error: error.message });
      failedCount++;
    }
  }

  return {
    success: successCount,
    failed: failedCount,
    results
  };
}

/**
 * Generate Cloudinary transformation URL
 * @param {string} cloudinaryUrl - Original Cloudinary URL
 * @param {object} transformations - Transformation options
 * @returns {string} - Transformed URL
 */
export function getTransformedUrl(cloudinaryUrl, transformations = {}) {
  if (!cloudinaryUrl || !cloudinaryUrl.includes('cloudinary.com')) {
    return cloudinaryUrl;
  }

  try {
    const publicId = extractPublicId(cloudinaryUrl);
    if (!publicId) {
      return cloudinaryUrl;
    }

    // Build transformation string
    const transformParts = [];
    
    if (transformations.width) transformParts.push(`w_${transformations.width}`);
    if (transformations.height) transformParts.push(`h_${transformations.height}`);
    if (transformations.crop) transformParts.push(`c_${transformations.crop}`);
    if (transformations.quality) transformParts.push(`q_${transformations.quality}`);
    if (transformations.format) transformParts.push(`f_${transformations.format}`);

    const transformString = transformParts.length > 0 ? `${transformParts.join(',')}/` : '';

    return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${transformString}${publicId}`;
    
  } catch (error) {
    console.error('Error generating transformed URL:', error);
    return cloudinaryUrl;
  }
}

export default cloudinary;