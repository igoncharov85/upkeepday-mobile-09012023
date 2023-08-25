import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NavigationEnum } from "../../../common/constants/navigation";
import { useAppSelector } from "../../../store/hooks";
import { dispatch } from "../../../store/store";
import { getSchoolTeachersAction } from "../../../store/businessAccount/actions";
import { ITeacher } from "../../../store/businessAccount/entities/ITeacher";
import { updateCurrentClassRequestAction } from "../../../store/shedule";

export const useAddTeachers = () => {
    const { currentTeachers, currentSchool } = useAppSelector(state => state.businessAccount);
    const { goBack, navigate } = useNavigation<NativeStackNavigationProp<any>>();
    const [search, setSearch] = useState('');
    const [currentTeacher, setCurrentTeacher] = useState<ITeacher>();
    const filteredTeachers = useMemo(() => search ? currentTeachers.filter(item => `${item.FirstName} ${item.LastName}`.toLowerCase().includes(search.toLowerCase())) : currentTeachers, [currentTeachers, search]);

    useEffect(() => {
        if (currentSchool?.SchoolId) {
            dispatch(getSchoolTeachersAction(currentSchool?.SchoolId));
        }
    }, [currentSchool]);

    const onAddLater = useCallback(() => {
        navigate(NavigationEnum.SCHOOL_CLASS_LOCATION_TEACHER);
    }, []);

    const onSetCurrentTeacher = (item: ITeacher) => {
        return () => {
            setCurrentTeacher(item);
        };
    };

    const onSave = useCallback(() => {
        dispatch(updateCurrentClassRequestAction({ Teacher: { TeacherId: currentTeacher?.TeacherId } }));
        navigate(NavigationEnum.SCHOOL_CLASS_LOCATION_TEACHER);
    }, [currentTeacher]);

    return { currentTeachers, filteredTeachers, search, currentTeacher, goBack, setSearch, onAddLater, onSave, onSetCurrentTeacher };
};