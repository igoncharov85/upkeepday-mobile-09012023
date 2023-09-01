import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import { dispatch } from "../../../store/store";
import { NavigationEnum } from "../../../common/constants/navigation";
import { updateCurrentClassRequestAction } from "../../../store/shedule";

export const useAddSchoolClass = () => {
    const { goBack, navigate } = useNavigation<NativeStackNavigationProp<any>>();
    const [name, setName] = useState('');

    const onSaveName = useCallback(() => {
        // dispatch(businessClassFormActions.setClassName(name));
        dispatch(updateCurrentClassRequestAction({ Class: { Name: name } }));
        navigate(NavigationEnum.SELECT_SCHOOL_DATE_SCREEN)
    }, [name]);

    return { name, setName, onSaveName, goBack };
};