import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FormikProps, withFormik } from 'formik';

import { formicDefaultProps } from '../../../../common/constants/styles/form.config';
import { CustomModal } from "../../../../components/UI/CustomModal";
import { ScreenHeader } from "../../../../components/ScreenHeader";
import styles from "./styles";
import { CustomButton } from "../../../../components/UI/CustomButton";
import { InputForm } from "../InputForm";
import { CountrySelect } from "../../../../components/UI/CountrySelect";
import { StateSelect } from "../../../../components/UI/StateSelect";
import { dispatch } from "../../../../store/store";
import { addLocationAction } from "../../../../store/location/actions";
import { AddLocationSchema } from "../../../../common/shemas/addClass.shape";
import { ILocationRequest } from "../../../../common/types/location";
import { useAppSelector } from "../../../../store/hooks";


interface IAddNewAddressModal {
    visible: boolean;
    handleShowModal: () => void;
}
const formInitialValues = {
    name: ' ',
    url: ' ',
    locationType: ' ',
    addressLine: ' ',
    city: ' ',
    state: ' ',
    postalCode: ' ',
    country: ' '
};

export const AddNewAddressModal: React.FC<IAddNewAddressModal> = ({ visible, handleShowModal }) => {

    const renderForm = ({
        errors,
        values,
        handleChange,
        handleSubmit,
        isValid,
    }: FormikProps<typeof formInitialValues>) => {
        return (
            <>
                <InputForm
                    labelText="Address Line 1"
                    onChange={handleChange('addressLine')}
                    value={values.addressLine}
                    validationErrorText={errors.addressLine}
                />
                <View style={styles.rowInput}>
                    <View style={styles.inputSplitted}>
                        <Text style={styles.label}>Country</Text>
                        <CountrySelect
                            onChange={handleChange('country')}
                            value={values.country}
                            placeholder={'Select country'}
                        />
                    </View>
                    <View style={styles.inputSplitted}>
                        <Text style={styles.label}>State</Text>
                        <StateSelect
                            value={values.state}
                            onChange={handleChange('state')}
                            placeholder={'Select state'}
                        />
                    </View>
                </View>
                <InputForm
                    labelText="Postal Code"
                    onChange={handleChange('postalCode')}
                    value={values.postalCode}
                    validationErrorText={errors.postalCode}

                />
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <CustomButton text={"Save"} onPress={handleSubmit} disabled={isValid} />
                </View></>
        );
    }

    const AddLocationForm = withFormik<any, typeof formInitialValues>({
        validationSchema: AddLocationSchema,

        handleSubmit: values => {
            const data: ILocationRequest = {
                Name: `${values.addressLine}, ${values.city}, ${values.country}, ${values.state}`,
                Url: '',
                LocationType: '',
                AddressLine: values.addressLine,
                City: '',
                State: values.state,
                PostalCode: values.postalCode,
                Country: values.country
            };
            handleShowModal();
            dispatch(addLocationAction(data))
        },
        ...formicDefaultProps,
    })(renderForm);
    return (

        <CustomModal isVisible={visible} closeModal={handleShowModal} height={550} withOverlay={true}>
            <View style={{
                paddingHorizontal: 20,
                paddingVertical: 20,
                height: '100%'
            }}><View>
                    <ScreenHeader text={"Add New Address"} onBackPress={handleShowModal} withBackButton={true} />
                </View>
                <AddLocationForm />
            </View>
        </CustomModal>

    )
}




