import React, { useMemo } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { ScreenHeader } from "../../components/ScreenHeader";
import { CustomButton } from "../../components/UI/CustomButton";
import { CustomInput } from "../../components/UI/CustomInput";
import { useAddBusinessAccount } from "./presenters/useAddBusinessAccount";
import { getStyles } from "./styles";
import { ScreenContainer } from "../../components/UI/screenContainer";
import { LocationDropdowns } from "./components/locationDropdowns";

export const AddBusinessAccountScreen = () => {
    const styles = useMemo(() => getStyles(), []);
    const {
        name, phone, address, city, country, state, postalCode, isValid, countries, states,
        goBack, setName, setPhone, setAddress, setCity, setCountry, setState, setPostalCode, onPress
    } = useAddBusinessAccount();

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScreenContainer scrollEnabled>
                <ScreenHeader containerStyle={styles.header} text="Add Business Account" withBackButton={true} onBackPress={goBack} />
                <View style={styles.formWrapper}>
                    <CustomInput
                        wrapperStyle={styles.input}
                        placeholder={'Name'}
                        labelText={'Business Name'}
                        value={name}
                        onChangeText={setName}
                        touched={!!name}
                        validationErrorText={!name ? 'fill row' : ''}
                    />
                    <CustomInput
                        wrapperStyle={styles.input}
                        placeholder={'+1'}
                        labelText={'Phone Number'}
                        value={phone}
                        onChangeText={setPhone}
                        touched={!!phone}
                        validationErrorText={!phone ? 'fill row' : ''}
                    />
                    <CustomInput
                        wrapperStyle={styles.input}
                        placeholder={'Address Text'}
                        labelText={'Address Line 1'}
                        value={address}
                        onChangeText={setAddress}
                        touched={!!address}
                        validationErrorText={!address ? 'fill row' : ''}
                    />
                    <CustomInput
                        wrapperStyle={styles.input}
                        placeholder={'City Name'}
                        labelText={'City'}
                        value={city}
                        onChangeText={setCity}
                        touched={!!city}
                        validationErrorText={!city ? 'fill row' : ''}
                    />
                    <LocationDropdowns
                        countries={countries}
                        states={states}
                        country={country}
                        state={state}
                        setCountry={setCountry}
                        setState={setState}
                    />
                    <CustomInput
                        wrapperStyle={styles.input}
                        placeholder={'113245'}
                        labelText={'Postal Code'}
                        value={postalCode}
                        onChangeText={setPostalCode}
                        touched={!!postalCode}
                        validationErrorText={!postalCode ? 'fill row' : ''}
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <CustomButton disabled={!isValid} text={'Next step'} onPress={onPress} />
                </View>
            </ScreenContainer>
        </KeyboardAvoidingView>
    );
};