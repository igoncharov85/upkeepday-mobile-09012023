export interface ICropedImage {
    creationDate: string;
    cropRect: { height: number; width: number; x: number; y: number; };
    data: string;
    duration: null;
    exif: null;
    filename: string;
    height: number;
    localIdentifier: string;
    mime: string;
    modificationDate: null;
    path: string;
    size: number;
    sourceURL: string;
    width: number;
}