export interface IPickImageOptions {
    mediaType?: 'photo' | 'video' | 'any';
    includeBase64?: boolean;
    compressImageQuality?: number;
    forceJpg?: boolean;
    multiple?: boolean;
    width?: number;
    height?: number;
    cropping?: boolean;
}