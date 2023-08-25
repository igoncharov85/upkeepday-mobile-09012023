import { I18n } from 'i18n-js';
import { translations } from './Translations';
import { storage } from '../../libs/storage';
import { getLocales } from "react-native-localize";
import { useEffect, useMemo, useState } from 'react';

const i18n = new I18n();

export const useLocalization = () => {
    const [localizationStore, setLocalizationStore] = useState('');
    const locales = useMemo(() => Object.keys(translations), [translations]);

    useEffect(() => {
        i18n.enableFallback = true;
        i18n.translations = translations;
        load().then(() => setLanguageByDeviceLocale());
    }, []);

    const setLanguageByDeviceLocale = (defaultLocale: string = 'en') => {
        try {
            if (!localizationStore) {
                const deviceLocale = getLocales()?.[0]?.languageCode || '';
                const isLanguageIncludes = Object.keys(translations).includes(deviceLocale);
                if (isLanguageIncludes && deviceLocale) {
                    setLocale(deviceLocale);
                } else {
                    setLocale(defaultLocale);
                };
            };
        } catch (error) {
            console.warn('Localization -> setLanguageByDeviceLocale: ', error);
        };
    };

    const load = async () => {
        storage.get('LANGUAGE')
            .then(data => { data && (setLocalizationStore(data)) })
            .catch(error => console.warn('Localization -> load: ', error));
        storage.get('TRANSLATIONS')
            .then(data => { data && (i18n.translations = data) })
            .catch(error => console.warn('Localization:TRANSLATIONS -> load: ', error));
    };

    const persistLanguage = (data: string | null) => {
        if (data) {
            storage.set('LANGUAGE', data);
        } else {
            storage.remove('LANGUAGE');
        };
    };

    const persistTranslations = (data: object) => {
        if (data) {
            storage.set('TRANSLATIONS', data);
        };
    };

    const setTranslation = (translations: any) => {
        if (typeof translations === 'object' && translations) {
            i18n.translations = translations;
            persistTranslations(translations);
        };
    };

    const t = (key: string) => {
        const locale = localizationStore;
        return i18n.t(key, { locale: locale });
    };

    const setLocale = (locale: string) => {
        setLocalizationStore(locale);
        persistLanguage(locale);
    };

    return {
        locales,
        locale: localizationStore,
        setLocale,
        setTranslation,
        t,
    };
};