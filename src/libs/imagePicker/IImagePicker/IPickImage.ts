import { ICropedImage } from "./ICropedImage";
import { IPickImageOptions } from "./IPickImageOptions";

export interface IPickImage {
    onOpenPicker: (options: IPickImageOptions) => Promise<ICropedImage | null>
}