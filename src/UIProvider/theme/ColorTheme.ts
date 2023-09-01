import { IColors, TTheme } from "./IColors";
import { COLORS } from './Colors';
import { IStorage } from "../../libs/storage";
import { useEffect, useMemo, useState } from "react";

export const useColorTheme = (allThemeColorsStore: { [key: string]: IColors; }, storage: IStorage) => {
    const [theme, setTheme] = useState<TTheme>('light');
    const colors = useMemo(() => allThemeColorsStore?.[theme] || COLORS.light, [theme]);

    useEffect(() => { load() }, []);

    const load = () => {
        storage.get('COLOR_THEME')
            .then(data => { data && setTheme(data) })
            .catch(error => console.warn('COLOR_THEME -> load: ', error));
    };

    const onsetTheme = (data: TTheme) => {
        setTheme(data);
        storage.set('COLOR_THEME', data);
    }

    return { theme, colors, setTheme: onsetTheme };
};