import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useMemo, useState } from "react";
import { dispatch } from "../../../store/store";
import { NavigationEnum } from "../../../common/constants/navigation";
import { pushToastsAction } from "../../../store/app";
import { TPermission, ITeacher } from "../../../store/businessAccount/entities/ITeacher";
import { businessAccountFormActions } from "../../../store/businessAccountForm";

export const useAddNewTeacher = () => {
    const { goBack, pop, push } = useNavigation<NativeStackNavigationProp<any>>();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [permission, setPermission] = useState<TPermission>('ViewOwnSchedule');
    const [notes, setNotes] = useState('');
    const form = useMemo<ITeacher>(() => ({
        FirstName: name,
        LastName: lastName,
        Email: email,
        Phone: phone,
        Permission: permission,
        Notes: notes
    }), [name, lastName, email, phone, permission, notes]);
    const isValid = useMemo(() => name && lastName && email && phone && permission, [name, lastName, email, phone, permission,]);

    const onAddTeacher = useCallback(() => {
        dispatch(businessAccountFormActions.addTeacher(form));
        dispatch(pushToastsAction({ type: 'info', text1: `Teacher ${form.FirstName} ${form.LastName} added.`, autoHide: true }));
        pop();
        push(NavigationEnum.ADD_NEW_TEACHER_SCREEN);
    }, [form]);

    return {
        name, lastName, email, phone, permission, notes, isValid,
        setName, setLastName, setEmail, setPhone, setPermission, setNotes, goBack, onAddTeacher
    };
};