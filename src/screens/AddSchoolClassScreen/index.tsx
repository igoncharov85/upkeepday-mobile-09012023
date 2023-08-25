import React, { useMemo } from "react";
import { View } from "react-native";
import { ScreenHeader } from "../../components/ScreenHeader";
import { CustomButton } from "../../components/UI/CustomButton";
import { CustomInput } from "../../components/UI/CustomInput";
import { getStyles } from "./styles";
import { ScreenContainer } from "../../components/UI/screenContainer";
import { useAddSchoolClass } from "./presenters/useAddSchoolClass";
import { useUiContext } from "../../UIProvider";

export const AddSchoolClassScreen = () => {
    const { t } = useUiContext();
    const styles = useMemo(() => getStyles(), []);
    const { name, setName, onSaveName, goBack } = useAddSchoolClass();

    return (
        <ScreenContainer scrollEnabled containerStyle={styles.container}>
            <ScreenHeader containerStyle={styles.header} text={t('classGeneralData')} withBackButton={true} onBackPress={goBack} />
            <View style={styles.formWrapper}>
                <CustomInput
                    placeholder={t('class1')}
                    labelText={t('name')}
                    value={name}
                    onChangeText={setName}
                    touched={!!name}
                    validationErrorText={!name ? t('fillRow') : ''}
                />
            </View>
            <CustomButton disabled={!name} text={t('stepCounter').replace('{step}', '1').replace('{total}', '10')} onPress={onSaveName} />
        </ScreenContainer>
    );
};