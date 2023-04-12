import React, { useEffect, useState } from "react";
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
import { FormikProps, withFormik } from "formik";
import { dispatch } from "../../store/store";
import { updateCurrentClassRequestAction } from "../../store/shedule";
import { AddClassSchema } from "../../common/shemas/addClass.shape";
import { formicDefaultProps } from "../../common/constants/styles/form.config";

interface IAddClassScreen { }

enum TypeLocation {
    Online = 0,
    InPerson = 1,
}

const formInitialValues = {
    name: ' ',
    locationType: ' ',
    addressLine: ' ',
};
export const AddClassScreen: React.FC<IAddClassScreen> = () => {
    const [typeLocation, setTypeLocation] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [classLocation, setClassLocation] = useState('');
    const navigation = useNavigation();



    const handleShowModal = () => {
        setModalVisible(!modalVisible);
    };
    const handleTypeChange = (type: any) => {
        setTypeLocation(type);
    }

    const handleClassLocation = (location: string) => {
        setClassLocation(location)
    }
    useEffect(() => {
        return () => {

        };
    }, []);

    const switchType = (type: any) => {
        switch (type) {
            case TypeLocation.Online:
                return <InputForm labelText='Online Instructions' multiline={true} style={{ height: 300, textAlignVertical: 'top' }} />;
            case TypeLocation.InPerson:
                return <LocationSelect value={classLocation} onChange={handleShowModal} labelText="Class Location" />;
            default: null
        }
    }
    const renderForm = ({
        errors,
        values,
        handleChange,
        handleSubmit,
        isValid
    }: FormikProps<typeof formInitialValues>) => {
        console.log(errors)
        return (
            <>
                <View>
                    <InputForm
                        labelText='Name'
                        value={values.name}
                        onChange={handleChange('name')}
                    />
                    <ListButtons buttons={['Online', 'In-person']} label="Class Type" onPress={handleTypeChange} />
                    {switchType(typeLocation)}



                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%' }} >
                    <CustomButton
                        text={"Next Step"}
                        //@ts-ignore
                        onPress={handleSubmit}
                    />
                </View>
            </>
        );
    }

    const AddLocationForm = withFormik<any, typeof formInitialValues>({
        validationSchema: AddClassSchema,

        handleSubmit: values => {
            dispatch(updateCurrentClassRequestAction({ ClassLocationType: typeLocation, ClassName: values.name, }))
            //@ts-ignore
            navigation.navigate(NavigationEnum.SELECT_DATE_SCREEN)
        },
        ...formicDefaultProps,
    })(renderForm);

    return (
        <View style={styles.container}>
            <ScreenHeader onBackPress={navigation.goBack} text="Add Class General Data" withBackButton={true} />
            <AddLocationForm />
            <ChooseAddressModal visible={modalVisible} handleShowModal={handleShowModal} handleClassLocation={handleClassLocation} />
        </View>
    )
}