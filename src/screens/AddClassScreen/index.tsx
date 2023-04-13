import React, { memo, useCallback, useState } from "react";
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
import { Formik, FormikProps } from "formik";
import { useDispatch } from "react-redux";
import { updateCurrentClassRequestAction } from "../../store/shedule";
import { AddClassSchema } from "../../common/shemas/addClass.shape";
import { formicDefaultProps } from "../../common/constants/styles/form.config";

interface IAddClassScreen { }

enum TypeLocation {
    Online = 0,
    InPerson = 1,
}

const formInitialValues = {
    name: " ",
    locationType: " ",
    addressLine: " ",
};

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
            return (
                <>
                    <View>
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
                    <View style={{ flex: 1, justifyContent: "flex-end", width: "100%" }}>
                        <CustomButton
                            text={"Next Step"}
                            onPress={handleSubmit}
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
                    ClassLocationType: typeLocation,
                    ClassName: values.name,
                })
            );
            //@ts-ignore
            navigation.navigate(NavigationEnum.SELECT_DATE_SCREEN);
        },
        [dispatch, typeLocation, navigation]
    );

    return (
        <View style={styles.container}>
            <ScreenHeader
                onBackPress={navigation.goBack}
                text="Add Class General Data"
                withBackButton={true}
            />
            <Formik
                initialValues={formInitialValues}
                validationSchema={AddClassSchema}
                onSubmit={handleSubmit}
                {...formicDefaultProps}
            >
                {renderForm}
            </Formik>
        </View>
    );
});
