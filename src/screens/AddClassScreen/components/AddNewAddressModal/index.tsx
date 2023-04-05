import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


import { CustomModal } from "../../../../components/UI/CustomModal";
import { ScreenHeader } from "../../../../components/ScreenHeader";
import styles from "./styles";
import { CustomButton } from "../../../../components/UI/CustomButton";
import { InputForm } from "../InputForm";
import { CountrySelect } from "../../../../components/UI/CountrySelect";
import { StateSelect } from "../../../../components/UI/StateSelect";

interface IAddNewAddressModal {
    visible: boolean;
    handleShowModal: () => void;
}


export const AddNewAddressModal: React.FC<IAddNewAddressModal> = ({ visible, handleShowModal }) => {

    return (

        <CustomModal isVisible={visible} closeModal={handleShowModal} height={550} withOverlay={true}>
            <View style={{
                paddingHorizontal: 20,
                paddingVertical: 20,
                height: '100%'
            }}><View>
                    <ScreenHeader text={"Add New Address"} onBackPress={handleShowModal} withBackButton={true} />
                </View>
                <InputForm labelText="Address Line 1" />
                <View style={styles.rowInput}>
                    <View style={styles.inputSplitted}>
                        <CountrySelect
                            label={'Country'}
                            onChange={() => console.log(1)}
                            value={'values.country'}
                            placeholder={'Select country'}
                        />
                    </View>
                    <View style={styles.inputSplitted}>
                        <StateSelect
                            label={'State'}
                            value={'values.state'}
                            onChange={() => console.log(1)}
                            placeholder={'Select state'}
                        />
                    </View>
                </View>
                <InputForm labelText="Postal Code" />
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>

                    <CustomButton text={"Save"} onPress={handleShowModal} />
                </View>
            </View>
        </CustomModal>

    )
}


interface IAddressItem {
    activeIndex: number;
    index: number;
    address: string;
    onTouch: (index: number) => void
}
const AddressItem: React.FC<IAddressItem> = ({ activeIndex, index, address, onTouch }) => {
    const activeItem = activeIndex === index;

    return (
        <>
            <TouchableOpacity style={styles.addressItem} onPress={() => onTouch(index)}>
                <Text style={[styles.textAddress, activeItem && styles.active]}>{address}</Text>
            </TouchableOpacity>
            <DecorationLine />
        </>
    )
}

const NewAddressButton = () => {

    return (
        <TouchableOpacity style={styles.addressItem}>
            <Text style={[styles.textAddress]}>Add New Address</Text>
        </TouchableOpacity>
    )
}

const DecorationLine = () => (
    <View style={{ width: '100%', height: 1, backgroundColor: '#BAC2CB', }} />
)


