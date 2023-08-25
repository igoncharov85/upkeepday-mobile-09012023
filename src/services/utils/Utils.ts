import { Platform, Dimensions, PixelRatio } from 'react-native';
import { initialWindowMetrics, Metrics } from 'react-native-safe-area-context';

export class Utils {
    private static instance: Utils;

    private static initialWindow: Metrics;
    private static _isIOS: boolean = Platform.OS === 'ios';
    private static _size: { width: number, height: number } = Dimensions.get('window');

    constructor() {
        if (Utils.instance) {
            return Utils.instance;
        }
        Utils.instance = this;
    }

    static get isIOS() {
        return Utils._isIOS;
    }

    static get size() {
        return { ...Utils._size };
    }

    static get getFrameHeight() {
        const initialWindow = Utils.getInitialWindowMetrics;
        return initialWindow.frame.height - initialWindow.insets.bottom - initialWindow.insets.top;
    }

    static get getInitialWindowMetrics() {
        if (Utils.initialWindow) {
            return Utils.initialWindow;
        } else if (initialWindowMetrics) {
            Utils.initialWindow = initialWindowMetrics;
            return Utils.initialWindow;
        } else {
            const { width, height } = Dimensions.get('window');
            return { frame: { height, width, x: 0, y: 0 }, insets: { bottom: 0, left: 0, right: 0, top: 0 } };
        }
    }

}

export const declOfNum = (number: number, translates: [string, string, string]): string => {
    const newNumber = number % 10;
    if (number > 10 && number < 20) {
        return translates[2];
    }
    if (newNumber > 1 && newNumber < 5) {
        return translates[1];
    }
    if (newNumber === 1) {
        return translates[0];
    }
    return translates[2];
};

/* Scale */

const idealWidth: number = 375;
const idealHeight: number = 812;
const size: { width: number, height: number } = Dimensions.get('window');
const ratio: number = PixelRatio.getFontScale();

export const scaleHorizontal = (inWidth: number = 1): number => {
    const delimiter: number = idealWidth / inWidth;
    return size.width / delimiter;
};

export const scaleVertical = (inHeight: number = 1) => {
    const delimiter: number = idealHeight / inHeight;
    return size.height / delimiter;
};

export const scaleFontSize = (fontSize: number = 1): number => {
    const divisionRatio: number = idealWidth / (fontSize / ratio);
    return size.width / divisionRatio;
};

export const scaleLineHeight = (lineHeight: number = 1): number => {
    const divisionRatio: number = idealHeight / (lineHeight / ratio);
    return size.height / divisionRatio;
};
