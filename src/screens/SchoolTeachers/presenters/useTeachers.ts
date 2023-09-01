import { useEffect, useState } from "react";
import { businessAccountActions, selectBusinessAccount } from "../../../store/businessAccount";
import { useAppSelector } from "../../../store/hooks";
import { dispatch } from "../../../store/store";
import { getSchoolTeachersAction } from "../../../store/businessAccount/actions";
import { ITeacher } from "../../../store/businessAccount/entities/ITeacher";

export const useTeachers = () => {
    const { schoolTeachers } = useAppSelector(selectBusinessAccount);
    const [isDeleteModal, setIsDeleteModel] = useState(false);

    useEffect(() => {
        dispatch(getSchoolTeachersAction());
    }, []);

    const deleteTeacher = (item: ITeacher) => {
        dispatch(businessAccountActions.setEditingTeacher(item))
        setIsDeleteModel(true);
    };

    const onClose = () => { setIsDeleteModel(false) };

    return { schoolTeachers, isDeleteModal, deleteTeacher, onClose };
};