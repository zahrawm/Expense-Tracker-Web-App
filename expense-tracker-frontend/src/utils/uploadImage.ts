import axios from 'axios';
import { API_PATHS } from './apiPaths';

export const uploadImage =  async(imageFile: string | Blob) => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await axios.post(API_PATHS.IMAGE.UPLOAD, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data.imageUrl;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Image upload failed: ${error.message}`);
        }
        throw new Error('Image upload failed');
    }
};