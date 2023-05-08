import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useNavigation } from '@react-navigation/native';
import { NavigationEnum } from '../../common/constants/navigation';
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
    const handleTypeChange = (type: any) => {
        setTypeAction(type);
    }

    const goBack = () => navigation.goBack()
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
                <View style={{ flexDirection: 'row', alignItems: 'center', zIndex: 1, maxWidth: '50%' }}>
                    <ScreenHeader text={'Add Students'} onBackPress={goBack} withBackButton={true} />


                </View>
                <TouchableOpacity style={{ position: 'absolute', top: 24, right: 20, zIndex: 1 }} onPress={goNextStep}>
                    <Text style={{ color: '#171930', fontSize: 14, lineHeight: 19, opacity: 0.4 }}>Add Later</Text>
                </TouchableOpacity>

                <View style={{ marginTop: -30 }}>
                    <ListButtons buttons={['Existing student', 'New Student']} onPress={handleTypeChange} />
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