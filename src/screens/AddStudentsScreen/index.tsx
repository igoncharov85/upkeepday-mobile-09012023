import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useNavigation } from '@react-navigation/native';
import { NavigationEnum } from '../../common/constants/navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ListButtons } from '../AddClassScreen/components/ListButtons';
import { CustomButton } from '../../components/UI/CustomButton';
import { ExistingStudent } from './ExistingStudent';
import { NewStudent } from './NewStudent';

interface IAddStudentsScreen {

}

enum TypeAction {
    ExistingStudent = 0,
    NewStudent = 1,
}
export const AddStudentsScreen: React.FC<IAddStudentsScreen> = () => {
    const [typeAction, setTypeAction] = useState(0);
    const navigation = useNavigation();
    //@ts-ignore
    const goNextStep = () => navigation.navigate(NavigationEnum.PREPAYMENT_CONFIGURATION_SCREEN);
    const onGoBack = () => navigation.goBack()
    const handleTypeChange = (type: any) => {
        setTypeAction(type);
    }

    const switchType = (type: any) => {
        switch (type) {
            case TypeAction.ExistingStudent:
                return <ExistingStudent />;
            case TypeAction.NewStudent:
                return <NewStudent />;
            default: null
        }
    }
    return (
        <View style={{ flex: 1, height: '100%' }}>
            <View style={{ padding: 20, paddingBottom: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ScreenHeader text={'Add Students'} onBackPress={() => navigation.goBack()} withBackButton={true} />
                    <TouchableOpacity activeOpacity={1} style={{ marginLeft: -20, }} >
                        <Text style={{ color: '#171930', fontSize: 14, lineHeight: 19, opacity: 0.4 }}>Add Later</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ marginTop: -30 }}>
                    <ListButtons buttons={['Existing student', 'New']} onPress={handleTypeChange} />
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    {switchType(typeAction)}
                </View>
                <View style={{ padding: 20, height: 92 }}>
                    <CustomButton text={'Next Step'} onPress={goNextStep} />
                </View>
            </View >
        </View>
    )
}