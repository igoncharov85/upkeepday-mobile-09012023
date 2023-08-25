import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { PERMISSIONS, check, RESULTS, openSettings, } from 'react-native-permissions';
import { IPickImageOptions } from './IImagePicker/IPickImageOptions';

class RNImageCropPicker {
    onLoadPhoto() {
        throw new Error('Method not implemented.');
    };

    private getCameraPermission = async () => {
        const permissionsStatus = await check(PERMISSIONS.IOS.CAMERA);
        switch (permissionsStatus) {
            case RESULTS.BLOCKED:
                await openSettings();
                break;
        };
    };

    private getGalleryPermission = async () => {
        const permissionsStatus = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
        switch (permissionsStatus) {
            case RESULTS.BLOCKED:
                await openSettings();
                break;
        };
    };

    onOpenPicker = async (options: IPickImageOptions = {}) => {
        try {
            await this.getGalleryPermission();
            const result: any = await ImagePicker.openPicker({
                includeBase64: true,
                compressImageQuality: 0.4,
                forceJpg: true,
                cropping: true,
                width: 800,
                height: 800,
                mediaType: 'photo',
                ...options,
            });
            return { ...result } as ImageOrVideo;
        } catch (error) {
            console.warn('RNImageCropPicker -> onOpenPicker: ', error);
            return null;
        }
    };

    onOpenCamera = async () => {
        try {
            await this.getCameraPermission();
            const result: any = await ImagePicker.openCamera({
                width: 600,
                height: 800,
                cropping: true,
                includeBase64: true,
                compressImageQuality: 0.4,
                forceJpg: true,
                mediaType: 'photo',
            });
            return { ...result } as ImageOrVideo;
        } catch (error) {
            console.warn('RNImageCropPicker -> onOpenCamera: ', error);
            return null;
        }
    };
}

export const imagePicker = new RNImageCropPicker();