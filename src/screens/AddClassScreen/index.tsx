import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LocationSelect } from "./components/LocationSelect";
import { ScreenHeader } from "../../components/ScreenHeader";
import { ListButtons } from "./components/ListButtons";
import styles from "./styles";
import { InputForm } from "./components/InputForm";
import { CustomButton } from "../../components/UI/CustomButton";
import { ScrollView } from "react-native-gesture-handler";
import { CustomModal } from "../../components/UI/CustomModal";
import { ChooseAddressModal } from "./components/ChooseAddressModal";
import { NavigationEnum } from "../../common/constants/navigation";

interface IAddClassScreen { }
enum TypeLocation {
    Online = 0,
    InPerson = 1,
}
export const AddClassScreen: React.FC<IAddClassScreen> = () => {
    const [typeLocation, setTypeLocation] = useState(0);
    const [modalVisible, setModalVisible] = useState(false)
    const navigation = useNavigation();

    const goToSelectDate = () => {
        console.log(1)
        //@ts-ignore
        navigation.navigate(NavigationEnum.SELECT_DATE_SCREEN)
    }
    const handleShowModal = () => {
        setModalVisible(!modalVisible);
    };
    const handleTypeChange = (type: any) => {
        setTypeLocation(type);
    }
    const switchType = (type: any) => {
        switch (type) {
            case TypeLocation.Online:
                return <InputForm labelText='Online Instructions' multiline={true} style={{ height: 300, textAlignVertical: 'top' }} />;
            case TypeLocation.InPerson:
                return <LocationSelect value={"25 Newport Pkwy, Jersey City, NJ"} onChange={handleShowModal} labelText="Class Location" />;
            default: null
        }
    }
    return (
        <View style={styles.container}>
            <ScreenHeader onBackPress={navigation.goBack} text="Add Class General Data" withBackButton={true} />
            <View>
                <InputForm labelText='Name' />
                <ListButtons buttons={['Online', 'In-person']} label="Class Type" onPress={handleTypeChange} />
                {switchType(typeLocation)}



            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%' }} >
                <CustomButton
                    text={"Next Step"}
                    //@ts-ignore
                    onPress={goToSelectDate}
                />
            </View>
            <ChooseAddressModal visible={modalVisible} handleShowModal={handleShowModal} />
        </View>
    )
}