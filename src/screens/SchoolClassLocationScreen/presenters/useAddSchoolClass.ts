import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useMemo, useState } from "react";
import { useUiContext } from "../../../UIProvider";
import { useAppSelector } from "../../../store/hooks";
import { dispatch } from "../../../store/store";
import { ILocation } from "../../../common/types/location";
import { businessClassFormActions } from "../../../store/businessClassForm";
import { NavigationEnum } from "../../../common/constants/navigation";
import { updateCurrentClassRequestAction } from "../../../store/shedule";

export const useAddSchoolClass = () => {
    const { t } = useUiContext();
    const types = [t('online'), t('inPerson')];
    const { goBack, navigate } = useNavigation<NativeStackNavigationProp<any>>();
    const { locations } = useAppSelector(state => state.location);
    const { Class, numberOf } = useAppSelector(state => state.businessClassForm);
    const [classLocation, setClassLocation] = useState<ILocation | undefined>(locations?.[0]);
    const [classRoom, setClassRoom] = useState(classLocation?.rooms?.[0]);
    const [isVisible, setIsVisible] = useState(false);
    const [isRoomsVisible, setIsRoomVisible] = useState(false);
    const [url, setUrl] = useState('');
    const [type, setType] = useState(1);
    const isDisabled = useMemo(() => type === 0 ? !url : !classLocation, [type, url, classLocation]);
    console.log(locations);
    const onSave = useCallback(() => {
        dispatch(updateCurrentClassRequestAction({
            Location: {
                LocationId: Number(classLocation?.LocationId),
                LocationType: type === 0 ? 'Online' : 'Office',
                Url: classLocation?.Url || '',
            }
        }));
        dispatch(businessClassFormActions.setRoom(classRoom?.RoomId));
        navigate(
            NavigationEnum.DATE_RECURRENCE_SCREEN,
            {
                buttonTitle: t('stepCounter').replace('{step}', '5').replace('{total}', '10'),
                endScheduleType: Class.EndScheduleType,
                finishDate: Class.EndDate,
                numberOf: numberOf,
            });
    }, [type, url, classLocation, Class, classRoom, numberOf]);

    const onSetIsVisible = useCallback(() => { setIsVisible(prev => !prev) }, []);
    const onSetIsRoomVisible = useCallback(() => { setIsRoomVisible(prev => !prev) }, []);

    return {
        locations, classRoom, types, type, isVisible, classLocation, url, isDisabled, isRoomsVisible,
        setClassLocation, setClassRoom, setType, onSetIsVisible, onSetIsRoomVisible, setUrl, onSave, goBack
    };
};