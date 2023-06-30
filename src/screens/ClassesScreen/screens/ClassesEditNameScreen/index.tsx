import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { View, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { LocationSelect } from "./components/LocationSelect";
import { ScreenHeader } from "../../../../components/ScreenHeader";
import { ListButtons } from "./components/ListButtons";
import styles from "./styles";
import { InputForm } from "./components/InputForm";
import { CustomButton } from "../../../../components/UI/CustomButton";
import { ChooseAddressModal } from "./components/ChooseAddressModal";
import { NavigationEnum } from "../../../../common/constants/navigation";
import { Formik, FormikProps } from "formik";
import { useDispatch } from "react-redux";
import { updateCurrentClassRequestAction } from "../../../../store/shedule";
import { AddClassNameSchema, AddClassSchema } from "../../../../common/shemas/addClass.shape";
import { formicDefaultProps } from "../../../../common/constants/styles/form.config";
import { fetchUsersAction } from "../../../../store/user/actions";
import { fetchLocationAction } from "../../../../store/location/actions";
import { useAppSelector } from "../../../../store/hooks";
import { editNameClassesAction } from "../../../../store/classes/actions";

interface IAddClassScreen { }

enum TypeLocation {
    Online = 0,
    InPerson = 1,
}


let windowHeight: any;
if (Platform.OS === 'ios') {
    windowHeight = Dimensions.get('window').height - 80;
} else {
    windowHeight = Dimensions.get('window').height - 20;
}

const ClassesEditNameScreen: React.FC<IAddClassScreen> = memo(() => {
    const navigation = useNavigation();
    const route = useRoute();
    const { item }: any = route.params;
    const dispatch = useDispatch();
    const formInitialValues = {
        name: item.Name,
        locationType: item.Location.LocationType,
        addressLine: item.Location.Address,
        url: "",
        locationId: item.Location.LocationId,
    };
    const { locations } = useAppSelector(state => state.location);
    const [typeLocation, setTypeLocation] = useState<TypeLocation>(item.Location.LocationType === "Online" ? TypeLocation.Online : TypeLocation.InPerson);
    const [modalVisible, setModalVisible] = useState(false);
    const [classLocation, setClassLocation] = useState(item.Location.Address || '');
    const [locationId, setLocationId] = useState(item.Location.LocationId);


    const handleShowModal = useCallback(() => {
        setModalVisible(!modalVisible);
    }, [modalVisible]);

    const handleTypeChange = useCallback((type: TypeLocation) => {
        setTypeLocation(type);
    }, []);

    const handleClassLocation = useCallback((location: string, id: number) => {
        setClassLocation(location);
        setLocationId(id);
    }, []);

    const renderForm = useCallback(
        ({
            values,
            handleChange,
            handleSubmit,
            isValid,
            setFieldValue
        }: FormikProps<typeof formInitialValues>) => {

            useEffect(() => {
                setFieldValue("addressLine", classLocation);
            }, [classLocation]);

            useEffect(() => {
                setFieldValue("locationId", locationId);
            }, [locationId]);


            return (
                <>
                    <View style={{ marginTop: 12 }}>
                        <InputForm
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
                                value={values.url}
                                onChange={handleChange("url")}
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
                            text={"Finish"}
                            onPress={handleSubmit}
                            disabled={!isValid}
                        />
                    </View>
                </>
            );
        },
        [typeLocation, classLocation, modalVisible, handleShowModal, handleTypeChange, handleClassLocation]
    );

    const handleSubmit = useCallback(
        (values: any) => {
            const Location = values.url ? { LocationId: values.locationId, Url: values.url } : { LocationId: values.locationId }
            //@ts-ignore
            navigation.navigate(NavigationEnum.RESULT_CLASS_MODAL, {
                item:
                {
                    ...item,
                    Name: values.name,
                    Location: {
                        LocationType: typeLocation == TypeLocation.InPerson ? 'Office' : 'Online', Url: typeLocation == TypeLocation.InPerson ? '' : values.url,
                        LocationId: values.locationId,
                        Address: values.addressLine
                    }
                },

                actionBtn: () => {
                    dispatch(editNameClassesAction(
                        { id: item.ClassId, Class: { Name: values.name }, Location: Location }
                    ));
                    //@ts-ignore
                    navigation.navigate(NavigationEnum.EDIT_CLASS_SCREEN);
                },
                nameAction: 'Confirm',
            });
        },
        [dispatch, typeLocation, navigation]
    );
    useEffect(() => {
        dispatch(fetchLocationAction());
    }, []);

    return (
        <KeyboardAvoidingView
            behavior="height"
        >
            <ScrollView>
                <View style={[styles.container, { height: windowHeight - 20 }]}>
                    <ScreenHeader
                        onBackPress={navigation.goBack}
                        text="Edit Class"
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


export default ClassesEditNameScreen;