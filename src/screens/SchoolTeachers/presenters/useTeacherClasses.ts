import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppSelector } from "../../../store/hooks";
import { selectBusinessAccount } from "../../../store/businessAccount";
import { useMemo, useState } from "react";

export const useTeacherClasses = () => {
    const { goBack } = useNavigation<NativeStackNavigationProp<any>>();
    const { editingTeacher } = useAppSelector(selectBusinessAccount);//TODO: replace schools on teachers schools
    const { classes } = useAppSelector(state => state.classes);
    const [search, setSearch] = useState('');
    const filteredClasses = useMemo(() => search ? classes.filter(item => item.Name.toLowerCase().includes(search)) : classes, [search, classes]);

    return { filteredClasses, editingTeacher, search, setSearch, goBack };
};