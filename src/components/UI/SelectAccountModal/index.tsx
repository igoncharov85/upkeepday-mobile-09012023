import React, { FC, useCallback, useMemo } from "react";
import { View, Image, Text, Modal, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { getStyles } from "./styles";
import { useSelectAccount } from "./presenters/useSelectAccount";
import { ScreenContainer } from "../screenContainer";
import LinearGradient from "react-native-linear-gradient";
import { useUiContext } from "../../../UIProvider";
import { ISchool } from "../../../store/businessAccount/entities/ISchool";

const BACKGROUND = require('../../../../assets/images/gradientBackground.png');

export const SelectAccountModal: FC = () => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { schools, isSelectAccount, isLoading, onSelect, onClear } = useSelectAccount();

    const keyExtractor = useCallback((item: ISchool, index: number) => String(item.SchoolId) + index, []);

    const renderItem = useCallback(({ item }: { item: ISchool }) => (
        <TouchableOpacity style={styles.schoolWrapper} onPress={onSelect(item)}>
            <Text style={styles.text}>{item.BusinessName}</Text>
        </TouchableOpacity>
    ), []);

    return (
        <Modal
            transparent
            visible={isSelectAccount}
        >
            <View style={styles.container}>
                <Image source={BACKGROUND} style={styles.backgroundImage} />
                <ScreenContainer containerStyle={styles.screenContainer}>
                    <LinearGradient
                        colors={colors.borderGradient}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0, y: 0.5 }}
                        style={styles.gradientWrapper}
                    >
                        <View style={styles.infoWrapper}>
                            <Text style={styles.title}>{t('chooseAccount')}</Text>
                            <TouchableOpacity style={styles.tutorWrapper} onPress={onClear}>
                                <Text style={styles.text}>{t('meAsPrivateTutor')}</Text>
                            </TouchableOpacity>
                            <Text style={styles.subTitle}>{t('associatedSchools')}</Text>
                            <FlatList
                                contentContainerStyle={styles.list}
                                showsVerticalScrollIndicator={false}
                                data={schools}
                                keyExtractor={keyExtractor}
                                renderItem={renderItem}
                                ListFooterComponent={isLoading ? <ActivityIndicator size={'small'} color={colors.primary} /> : null}
                            />
                        </View>
                    </LinearGradient>
                </ScreenContainer>
            </View>
        </Modal>
    );
};