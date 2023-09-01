import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback } from "react";
import { NavigationEnum } from "../../../../../common/constants/navigation";
import { useAppSelector } from "../../../../../store/hooks";
import { businessAccountActions, selectBusinessAccount } from "../../../../../store/businessAccount";
import { dispatch } from "../../../../../store/store";
import { getSchoolStudentsAction } from "../../../../../store/businessAccount/actions";
import { updatedStatusClassesAction } from "../../../../../store/classes/actions";

export const useMoreOptions = () => {
    const { navigate, goBack } = useNavigation<NativeStackNavigationProp<any>>();
    const { currentClass } = useAppSelector(selectBusinessAccount);

    const onUpdateStudents = useCallback(() => {
        dispatch(getSchoolStudentsAction());
        navigate(NavigationEnum.UPDATE_CLASS_STUDENTS_SCREEN);
    }, []);

    const onRolloverClass = useCallback(() => {
        dispatch(businessAccountActions.setIsEdit(false));
        navigate(NavigationEnum.ADD_SCHOOL_CLASS_SCREEN, { isClear: false });
    }, []);

    const onArchiveClass = useCallback(() => {
        navigate(NavigationEnum.RESULT_CLASS_MODAL, {
            item: currentClass,
            actionBtn: () => { dispatch(updatedStatusClassesAction('Archived')) },
            nameAction: 'Archive',
        });
    }, [currentClass]);

    return { currentClass, goBack, onUpdateStudents, onRolloverClass, onArchiveClass };
};