import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppSelector } from "../../../../../store/hooks";
import { selectBusinessAccount } from "../../../../../store/businessAccount";
import { useCallback, useMemo, useState } from "react";
import { dispatch } from "../../../../../store/store";
import { IStudentResponse } from "../../../../../common/types/user";
import { NavigationEnum } from "../../../../../common/constants/navigation";
import { updateSchoolClassStudentsAction } from "../../../../../store/businessAccount/actions";

export const useUpdateClassStudents = () => {
    const { navigate, goBack } = useNavigation<NativeStackNavigationProp<any>>();
    const { currentClass } = useAppSelector(selectBusinessAccount);
    const [search, setSearch] = useState('');
    const students = useMemo(() => search ? currentClass?.Students.filter((item: any) => `${item?.FirstName} ${item?.LastName}`.toLowerCase().includes(search)) : currentClass?.Students, [search, currentClass]);

    const onAdd = useCallback(() => { navigate(NavigationEnum.CHANGE_STUDENT_SCREEN, { currentClass, currentStudent: students }); }, [])
    const onDelete = useCallback((student: IStudentResponse) => {
        dispatch(updateSchoolClassStudentsAction({
            ExistingStudents: currentClass?.Students?.map(item => item?.StudentId).filter(item => item !== student.StudentId) || [],
            NewStudents: []
        }));
    }, [currentClass]);

    return { currentClass, students, search, setSearch, goBack, onDelete, onAdd };
};