import React, { useMemo } from "react";
import { View, Image, Text } from "react-native";
import { getStyles } from "./styles";
import { ScreenContainer } from "../../components/UI/screenContainer";
import { useSaveBusinessAccount } from "./presenters/useSaveBusinessAccount";
import { CustomButton } from "../../components/UI/CustomButton";

const BACKGROUND = require('../../../assets/images/gradientBackground.png');

export const SaveBusinessAccountScreen = () => {
    const styles = useMemo(() => getStyles(), []);
    const { School, Teachers, isLoading, goBack, onSave } = useSaveBusinessAccount();

    return (
        <View style={styles.container}>
            <Image source={BACKGROUND} style={styles.backgroundImage} />
            <ScreenContainer containerStyle={styles.screenContainer}>
                <View style={styles.infoWrapper}>
                    <Text style={styles.title}>Business Account</Text>
                    <View style={styles.textWrapper}>
                        <Text style={styles.text}>{School.BusinessName}</Text>
                        <Text style={styles.text}>{`Teachers: ${Teachers.length}`}</Text>
                    </View>
                </View>
                <View style={styles.buttonsWrapper}>
                    <CustomButton loading={isLoading} disabled={isLoading} style={styles.button} text={"Confirm"} onPress={onSave} />
                    <CustomButton disabled={isLoading} style={styles.backButton} text={"Back"} onPress={goBack} />
                </View>
            </ScreenContainer>
        </View>
    );
};