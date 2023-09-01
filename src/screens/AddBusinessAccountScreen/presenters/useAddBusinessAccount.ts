import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState, useCallback, useMemo, useEffect } from "react";
import { NavigationEnum } from "../../../common/constants/navigation";
import { businessAccountFormActions } from "../../../store/businessAccountForm";
import { dispatch } from "../../../store/store";
import { useAppSelector } from "../../../store/hooks";
import { ISchool } from "../../../store/businessAccount/entities/ISchool";

export const useAddBusinessAccount = () => {
    const { countries, states } = useAppSelector(state => state.auth);
    const { goBack, navigate } = useNavigation<NativeStackNavigationProp<any>>();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState(countries?.[0] || '');
    const [state, setState] = useState(states?.[0] || '');
    const [postalCode, setPostalCode] = useState('');
    const form = useMemo(() => ({
        BusinessName: name,
        Phone: phone,
        AddressLine1: address,
        Country: country,
        City: city,
        State: state,
        PostalCode: postalCode,
    }), [name, phone, address, city, country, state, postalCode]);
    const isValid = useMemo(() => !!(name && phone && address && city && country && state && postalCode), [form]);

    useEffect(() => {
        return () => { dispatch(businessAccountFormActions.clear()) };
    }, []);

    const saveFormLocal = (form: ISchool) => {
        dispatch(businessAccountFormActions.fillForm(form));
    };

    const onPress = useCallback(() => {
        saveFormLocal(form);
        navigate(NavigationEnum.ADD_TEACHERS_SCREEN);
    }, [form]);

    return {
        name, phone, address, city, country, state, postalCode, isValid, countries, states,
        goBack, setName, setPhone, setAddress, setCity, setCountry, setState, setPostalCode, onPress
    };
};