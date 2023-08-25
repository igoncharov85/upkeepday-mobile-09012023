import { useCallback } from "react";
import { useAppSelector } from "../../../../store/hooks";
import { dispatch } from "../../../../store/store";
import { businessAccountActions } from "../../../../store/businessAccount";
import { ISchool } from "../../../../store/businessAccount/entities/ISchool";

export const useSelectAccount = () => {
    const { schools, isSelectAccount, isLoading } = useAppSelector(store => store.businessAccount);

    const onSelect = useCallback((item: ISchool) => {
        return () => {
            dispatch(businessAccountActions.setCurrentSchools(item));
            dispatch(businessAccountActions.setIsSelectAccount(false));
        };
    }, []);

    const onClear = useCallback(() => {
        dispatch(businessAccountActions.setCurrentSchools(null));
        dispatch(businessAccountActions.setIsSelectAccount(false));
    }, []);

    return { schools, isSelectAccount, isLoading, onSelect, onClear };
};