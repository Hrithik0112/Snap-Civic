import axios from "axios";
import { CLOUDINARY_CONFIG } from "@/services/cloudinary";
    
interface UploadResponse {
  secure_url: string;
  public_id: string;
}

export const uploadToCloudinary = async (
  imageUri: string,
  onProgress?: (progress: number) => void
): Promise<UploadResponse> => {
  try {
    // Create form data
    const formData = new FormData();
    
    // Get filename from URI
    const filename = imageUri.split('/').pop() || 'image';
    
    // Get file type
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;

    // Append image file
    formData.append('file', {
      uri: imageUri,
      name: filename,
      type,
    } as any);

    // Append upload preset
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

    // Upload to Cloudinary with progress tracking
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            onProgress(progress);
          }
        },
      }
    );

    return {
      secure_url: response.data.secure_url,
      public_id: response.data.public_id,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
};