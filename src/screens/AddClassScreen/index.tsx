import { useNavigation, useRoute } from '@react-navigation/native'
import { Formik, FormikProps } from 'formik'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { NavigationEnum } from '../../common/constants/navigation'
import { formicDefaultProps } from '../../common/constants/styles/form.config'
import { AddClassNameSchema } from '../../common/shemas/addClass.shape'
import { ScreenHeader } from '../../components/ScreenHeader'
import { CustomButton } from '../../components/UI/CustomButton'
import { durationAction } from '../../store/duration/durationSlice'
import { useAppSelector } from '../../store/hooks'
import { fetchLocationAction } from '../../store/location/actions'
import { updateCurrentClassRequestAction } from '../../store/shedule'
import { fetchUsersAction } from '../../store/user/actions'
import { ChooseAddressModal } from './components/ChooseAddressModal'
import { InputForm } from './components/InputForm'
import { ListButtons } from './components/ListButtons'

import { LocationSelect } from './components/LocationSelect'
import styles from './styles'

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
export const AddClassScreen: React.FC<IAddClassScreen> = memo(() => {
    const route = useRoute();
    const { screenName, item }: any = route.params || {
        screenName: "",
        item: {},
    };

    const { createCurrentClassRequest }: any = useAppSelector(state => state.schedule);
    const [typeLocation, setTypeLocation] = useState<TypeLocation>(
        createCurrentClassRequest.Location.LocationType && createCurrentClassRequest.Location.LocationType == "Office" ? 1 : 0
    );

    const formInitialValues = {
        name: createCurrentClassRequest.Class.Name || "",
        locationType: createCurrentClassRequest.Location.LocationType || "",
        addressLine: createCurrentClassRequest.Location.AddressLine || "",
        url: createCurrentClassRequest.Location.Url || "",
    };
    const [modalVisible, setModalVisible] = useState(false);
    const [classLocation, setClassLocation] = useState(createCurrentClassRequest.Location.AddressLine || "");
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
                if (touch || screenName) {
                    setValid(isValid)
                }
            }, [isValid]);
            return (
                <>
                    <View style={{ marginTop: 12 }}>
                        <InputForm
                            autoCapitalize="sentences"
                            onTouchStart={() => setTouch(true)}
                            labelText="Class Name"
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
            dispatch(durationAction.clearDuration())
            dispatch(
                updateCurrentClassRequestAction({
                    Class: { Name: values.name },
                    Location: { LocationType: typeLocation == TypeLocation.InPerson ? 'Office' : 'Online', Url: typeLocation == TypeLocation.InPerson ? '' : values.url }
                })
            );

            //@ts-ignore
            navigation.navigate(NavigationEnum.SELECT_DATE_SCREEN);
        },
        [dispatch, typeLocation, navigation]
    );
    useEffect(() => {
        dispatch(fetchUsersAction());
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
                        text={screenName || "Add Class General Data"}
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
