import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NavigationEnum } from "../../../common/constants/navigation";
import { useAppSelector } from "../../../store/hooks";
import { dispatch } from "../../../store/store";
import { getSchoolTeachersAction } from "../../../store/businessAccount/actions";
import { ITeacher } from "../../../store/businessAccount/entities/ITeacher";
import { updateCurrentClassRequestAction } from "../../../store/shedule";
import { selectBusinessAccount } from "../../../store/businessAccount";

export const useAddTeachers = () => {
    const { schoolTeachers, currentSchool } = useAppSelector(selectBusinessAccount);
    const { goBack, navigate } = useNavigation<NativeStackNavigationProp<any>>();
    const [search, setSearch] = useState('');
    const [currentTeacher, setCurrentTeacher] = useState<ITeacher | undefined>(schoolTeachers?.find(item => item.TeacherId === schoolTeachers?.TeacherId));
    const filteredTeachers = useMemo(() => search ? schoolTeachers.filter(item => `${item.FirstName} ${item.LastName}`.toLowerCase().includes(search.toLowerCase())) : schoolTeachers, [schoolTeachers, search]);

    useEffect(() => {
        if (currentSchool?.SchoolId) {
            dispatch(getSchoolTeachersAction());
        };
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

    return { filteredTeachers, search, currentTeacher, goBack, setSearch, onAddLater, onSave, onSetCurrentTeacher };
};