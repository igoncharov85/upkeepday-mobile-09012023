import React, { useMemo } from "react";
import { View } from "react-native";
import { ScreenHeader } from "../../components/ScreenHeader";
import { CustomButton } from "../../components/UI/CustomButton";
import { getStyles } from "./styles";
import { ScreenContainer } from "../../components/UI/screenContainer";
import { useAddSchoolClass } from "./presenters/useAddSchoolClass";
import { useUiContext } from "../../UIProvider";
import { ListButtons } from "../AddClassScreen/components/ListButtons";
import { LocationSelect } from "../AddClassScreen/components/LocationSelect";
import { InputForm } from "../AddClassScreen/components/InputForm";
import { ChooseAddressModal } from "./components/ChooseAddressModal";

export const SchoolClassLocationScreen = () => {
    const { t } = useUiContext();
    const styles = useMemo(() => getStyles(), []);
    const {
        locations, classRoom, types, type, isVisible, classLocation, url, isDisabled, isRoomsVisible,
        setClassLocation, setClassRoom, setType, onSetIsVisible, onSetIsRoomVisible, setUrl, onSave, goBack
    } = useAddSchoolClass();

    return (
        <ScreenContainer containerStyle={styles.container}>
            <ScreenHeader containerStyle={styles.header} text={t('addLocation')} withBackButton={true} onBackPress={goBack} />
            <View style={styles.formWrapper}>
                <ListButtons
                    buttons={types}
                    label={t('classType')}
                    onPress={setType}
                    index={type}
                />
                {type
                    ? <>
                        <LocationSelect
                            value={classLocation
                                ? `${classLocation?.AddressLine}, ${classLocation?.City}, ${classLocation?.State}, ${classLocation?.Country} ${classLocation?.PostalCode}`
                                : ''
                            }
                            onChange={onSetIsVisible}
                            labelText={t('classLocation')}
                        />
                        <LocationSelect
                            value={classRoom?.Name || ''}
                            onChange={onSetIsRoomVisible}
                            labelText={t('selectRoomLocation')}
                        />
                    </>
                    : <InputForm
                        labelText="Online Instructions"
                        multiline={true}
                        value={url}
                        onChangeText={setUrl}
                        style={{ height: 300, textAlignVertical: "top" }}
                    />
                }
            </View>
            <CustomButton disabled={isDisabled} text={t('stepCounter').replace('{step}', '4').replace('{total}', '10')} onPress={onSave} />
            <ChooseAddressModal
                title={t('chooseAddress')}
                locations={locations}
                visible={isVisible}
                handleShowModal={onSetIsVisible}
                handleClassLocation={setClassLocation}
            />
            <ChooseAddressModal
                title={t('selectRoom')}
                locations={classLocation?.rooms || []}
                visible={isRoomsVisible}
                handleShowModal={onSetIsRoomVisible}
                handleClassLocation={setClassRoom}
            />
        </ScreenContainer>
    );
};