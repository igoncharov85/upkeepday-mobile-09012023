import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { View, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LocationSelect } from "./components/LocationSelect";
import { ScreenHeader } from "../../components/ScreenHeader";
import { ListButtons } from "./components/ListButtons";
import styles from "./styles";
import { InputForm } from "./components/InputForm";
import { CustomButton } from "../../components/UI/CustomButton";
import { CustomModal } from "../../components/UI/CustomModal";
import { ChooseAddressModal } from "./components/ChooseAddressModal";
import { NavigationEnum } from "../../common/constants/navigation";
import { Formik, FormikProps } from "formik";
import { useDispatch } from "react-redux";
import { updateCurrentClassRequestAction } from "../../store/shedule";
import { AddClassNameSchema, AddClassSchema } from "../../common/shemas/addClass.shape";
import { formicDefaultProps } from "../../common/constants/styles/form.config";

interface IAddClassScreen { }

enum TypeLocation {
    Online = 0,
    InPerson = 1,
}

const formInitialValues = {
    name: "",
    locationType: "",
    addressLine: "",
};
let windowHeight: any;
if (Platform.OS === 'ios') {
    windowHeight = Dimensions.get('window').height - 80;
} else {
    windowHeight = Dimensions.get('window').height - 20;
}
export const AddClassScreen: React.FC<IAddClassScreen> = memo(() => {
    const [typeLocation, setTypeLocation] = useState<TypeLocation>(
        TypeLocation.Online
    );
    const [modalVisible, setModalVisible] = useState(false);
    const [classLocation, setClassLocation] = useState("");
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleShowModal = useCallback(() => {
        setModalVisible(!modalVisible);
    }, [modalVisible]);

    const handleTypeChange = useCallback((type: TypeLocation) => {
        setTypeLocation(type);


    }, []);

    const handleClassLocation = useCallback((location: string) => {
        setClassLocation(location);
    }, []);

    const renderForm = useCallback(
        ({
            values,
            handleChange,
            handleSubmit,
            isValid,
        }: FormikProps<typeof formInitialValues>) => {
            const [touch, setTouch] = useState(false);
            const [valid, setValid] = useState(false);
            useEffect(() => {
                if (touch) {
                    setValid(isValid)
                }
            }, [isValid]);
            return (
                <>
                    <View style={{ marginTop: 12 }}>
                        <InputForm
                            onTouchStart={() => setTouch(true)}
                            labelText="Name"
                            value={values.name}
                            onChange={handleChange("name")}
                        />
                        <ListButtons
                            buttons={["Online", "In-person"]}
                            label="Class Type"
                            onPress={handleTypeChange}
                            index={typeLocation}
                        />
                        {typeLocation === TypeLocation.Online ? (
                            <InputForm
                                labelText="Online Instructions"
                                multiline={true}
                                style={{ height: 300, textAlignVertical: "top" }}
                            />
                        ) : (
                            <LocationSelect
                                value={classLocation}
                                onChange={handleShowModal}
                                labelText="Class Location"
                            />
                        )}

                        <ChooseAddressModal
                            visible={modalVisible}
                            handleShowModal={handleShowModal}
                            handleClassLocation={handleClassLocation}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: "flex-end", width: "100%", }}>
                        <CustomButton
                            text={"Next Step"}
                            onPress={handleSubmit}
                            disabled={!valid}
                        />
                    </View>
                </>
            );
        },
        [typeLocation, classLocation, modalVisible, handleShowModal, handleTypeChange, handleClassLocation]
    );

    const handleSubmit = useCallback(
        (values: any) => {
            dispatch(
                updateCurrentClassRequestAction({
                    Class: { Name: values.name },
                    Location: { LocationType: typeLocation ? 'Office' : 'Online' }
                })
            );

            //@ts-ignore
            navigation.navigate(NavigationEnum.SELECT_DATE_SCREEN);
        },
        [dispatch, typeLocation, navigation]
    );

    return (
        <KeyboardAvoidingView
            behavior="height"
        >
            <ScrollView>
                <View style={[styles.container, { height: windowHeight - 20 }]}>
                    <ScreenHeader
                        onBackPress={navigation.goBack}
                        text="Add Class General Data"
                        withBackButton={true}
                    />
                    <Formik
                        enableReinitialize={true}
                        initialValues={formInitialValues}
                        validationSchema={AddClassNameSchema}
                        onSubmit={handleSubmit}
                        {...formicDefaultProps}
                    >
                        {renderForm}
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
});
