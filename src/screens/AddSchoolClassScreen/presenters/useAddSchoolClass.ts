import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { dispatch } from "../../../store/store";
import { NavigationEnum } from "../../../common/constants/navigation";
import { updateCurrentClassRequestAction } from "../../../store/shedule";
import { useAppSelector } from "../../../store/hooks";
import { businessAccountActions, selectBusinessAccount } from "../../../store/businessAccount";

export const useAddSchoolClass = () => {
    const { goBack, navigate } = useNavigation<NativeStackNavigationProp<any>>();
    const { params } = useRoute<RouteProp<{ params: { isClear: boolean } }>>();
    const { currentClass } = useAppSelector(selectBusinessAccount);
    const [name, setName] = useState(currentClass?.Name || '');

    useEffect(() => {
        dispatch(updateCurrentClassRequestAction({ Class: {}, Location: {}, Teacher: {} }));
        if (params.isClear) {
            dispatch(businessAccountActions.setCurrentClass(null));
            setName('');
        };
    }, []);

    const onSaveName = useCallback(() => {
        dispatch(updateCurrentClassRequestAction({ Class: { Name: name } }));
        navigate(NavigationEnum.SELECT_SCHOOL_DATE_SCREEN)
    }, [name]);

    return { name, setName, onSaveName, goBack };
};