import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useMemo, useState } from "react";
import { NavigationEnum } from "../../../common/constants/navigation";
import { useAppSelector } from "../../../store/hooks";
import { dispatch } from "../../../store/store";
import { businessAccountFormActions } from "../../../store/businessAccountForm";

export const useAddTeachers = () => {
    const { Teachers } = useAppSelector(state => state.businessAccountForm);
    const { goBack, navigate } = useNavigation<NativeStackNavigationProp<any>>();
    const [search, setSearch] = useState('');
    const isTeachersListEmpty = useMemo(() => !Teachers.length, [Teachers]);
    const filteredTeachers = useMemo(() => search
        ? Teachers.filter(item => `${item.FirstName} ${item.LastName}`.toLowerCase().includes(search.toLowerCase()))
        : Teachers
        , [Teachers, search]);

    const onAddLater = useCallback(() => {
        dispatch(businessAccountFormActions.clearTeachers());
        navigate(NavigationEnum.SAVE_BUSINESS_ACCOUNT_SCREEN);
    }, []);

    const onAddTeacher = useCallback(() => {
        navigate(NavigationEnum.ADD_NEW_TEACHER_SCREEN)
    }, []);

    const onSave = useCallback(() => {
        navigate(NavigationEnum.SAVE_BUSINESS_ACCOUNT_SCREEN);
    }, []);

    return { filteredTeachers, search, isTeachersListEmpty, goBack, setSearch, onAddLater, onSave, onAddTeacher };
};