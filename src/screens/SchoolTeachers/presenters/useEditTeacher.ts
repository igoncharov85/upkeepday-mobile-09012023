import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useMemo, useState } from "react";
import { ITeacher, TPermission } from "../../../store/businessAccount/entities/ITeacher";
import { useAppSelector } from "../../../store/hooks";
import { businessAccountActions, selectBusinessAccount } from "../../../store/businessAccount";
import { dispatch } from "../../../store/store";
import { editSchoolTeacherAction } from "../../../store/businessAccount/actions";

export const useEditTeacher = () => {
    const { goBack } = useNavigation<NativeStackNavigationProp<any>>();
    const { editingTeacher, isLoading } = useAppSelector(selectBusinessAccount);
    const [name, setName] = useState(editingTeacher?.FirstName || '');
    const [lastName, setLastName] = useState(editingTeacher?.LastName || '');
    const [email, setEmail] = useState(editingTeacher?.Email || '');
    const [phone, setPhone] = useState(editingTeacher?.Phone || '');
    const [permission, setPermission] = useState<TPermission>(editingTeacher?.Permission || 'ViewOwnSchedule');
    const [notes, setNotes] = useState(editingTeacher?.Notes || '');
    const form = useMemo<ITeacher>(() => ({
        FirstName: name || editingTeacher?.FirstName || '',
        LastName: lastName || editingTeacher?.LastName || '',
        Email: email || editingTeacher?.Email || '',
        Phone: phone || editingTeacher?.Phone || '',
        Permission: permission || editingTeacher?.Permission || 'ViewOwnSchedule',
        Notes: notes || editingTeacher?.Notes || '',
        TeacherId: editingTeacher?.TeacherId,
    }), [name, lastName, email, phone, permission, notes]);
    const isValid = useMemo(() => name && lastName && email && phone && permission, [name, lastName, email, phone, permission]);

    const onEdit = useCallback(() => {
        dispatch(businessAccountActions.setEditingTeacher(form));
        dispatch(editSchoolTeacherAction());
        goBack();
    }, [form]);

    return {
        name, lastName, email, phone, permission, notes, isValid, isLoading,
        setName, setLastName, setEmail, setPhone, setPermission, setNotes, goBack, onEdit
    };
};