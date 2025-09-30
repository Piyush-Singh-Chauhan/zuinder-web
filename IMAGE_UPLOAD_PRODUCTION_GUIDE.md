# Image Upload Configuration Guide

## Problem:
Image uploads work on localhost but fail on staging/production because:
1. Production servers have read-only filesystems
2. Uploaded files get deleted on every deployment
3. Local `/public/uploads/` storage doesn't work in production

## Solution: Cloud Storage Setup

### Step 1: Install Cloudinary
```bash
npm install cloudinary
```

### Step 2: Get Cloudinary Credentials
1. Sign up at https://cloudinary.com (free tier available)
2. Get your credentials from the dashboard:
   - Cloud Name
   - API Key  
   - API Secret

### Step 3: Add Environment Variables
Add these to your `.env.local` (local) and staging environment:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

### Step 4: Deploy
After setting environment variables, deploy your staging site.

## How It Works:
- **Development**: Uses local storage (`/public/uploads/`)
- **Production**: Automatically detects Cloudinary config and uses cloud storage
- **Automatic optimization**: Images are resized and optimized
- **CDN delivery**: Fast global image delivery

## Alternative Solutions:

### Option 1: Vercel Blob Storage
```bash
npm install @vercel/blob
```
Add to `.env.local`:
```env
BLOB_READ_WRITE_TOKEN=your_vercel_token
```

### Option 2: AWS S3
```bash
npm install aws-sdk
```
Add to `.env.local`:
```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_S3_BUCKET=your_bucket_name
```

## Recommended: Use Cloudinary
- Free tier: 25GB storage, 25GB bandwidth
- Automatic image optimization
- Built-in CDN
- Easy setup