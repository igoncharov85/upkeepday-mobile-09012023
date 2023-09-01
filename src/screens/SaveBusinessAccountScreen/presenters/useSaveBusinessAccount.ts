import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppSelector } from "../../../store/hooks";
import { useCallback } from "react";
import { dispatch } from "../../../store/store";
import { createSchoolAction } from "../../../store/businessAccount/actions";

export const useSaveBusinessAccount = () => {
    const { School, Teachers } = useAppSelector(state => state.businessAccountForm);
    const { isLoading } = useAppSelector(state => state.businessAccount);
    const { goBack } = useNavigation<NativeStackNavigationProp<any>>();

    const onSave = useCallback(async () => { dispatch(createSchoolAction({ School, Teachers })) }, [School, Teachers]);

    return { School, Teachers, isLoading, goBack, onSave };
};