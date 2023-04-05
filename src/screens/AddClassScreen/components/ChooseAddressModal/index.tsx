import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


import { CustomModal } from "../../../../components/UI/CustomModal";
import { ScreenHeader } from "../../../../components/ScreenHeader";
import styles from "./styles";
import { CustomButton } from "../../../../components/UI/CustomButton";
import { AddNewAddressModal } from "../AddNewAddressModal";

interface IChooseAddressModal {
    visible: boolean;
    handleShowModal: () => void;
}

const data = ['25 Newport Pkwy, Jersey City, NJ', '20 Marin Blvd, Jersey City, NJ', '20 Marin Blvd, Jersey City, NJ', '20 Marin Blvd, Jersey City, NJ']
export const ChooseAddressModal: React.FC<IChooseAddressModal> = ({ visible, handleShowModal }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false)

    const onShowModal = () => {
        setModalVisible(!modalVisible);
    };
    const handlePress = (index: number) => {
        setActiveIndex(index);
        //something
    };
    return (
        <>
            <AddNewAddressModal visible={modalVisible} handleShowModal={onShowModal} />
            <CustomModal isVisible={visible} closeModal={handleShowModal} height={350}>
                <View style={{
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                }}>
                    <ScreenHeader text={"Choose Address"} onBackPress={handleShowModal} withBackButton={true} />
                </View>
                <DecorationLine />
                <ScrollView style={{ height: 125, }}>
                    {data.map((title, index) => <AddressItem activeIndex={activeIndex} index={index} key={index} address={title} onTouch={handlePress} />)}

                    <NewAddressButton addAddress={onShowModal} />
                </ScrollView>
                <DecorationLine />
                <View style={{ justifyContent: 'flex-end' }}>
                    <View style={{
                        padding: 20,
                    }}>
                        <CustomButton text={"Save"} onPress={handleShowModal} />
                    </View>
                    <DecorationLine />
                </View>

            </CustomModal>
        </>
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

const NewAddressButton = ({ addAddress }: { addAddress: () => void }) => {

    return (
        <TouchableOpacity style={styles.addressItem} onPress={() => addAddress()}>
            <Text style={[styles.textAddress]}>Add New Address</Text>
        </TouchableOpacity>
    )
}

const DecorationLine = () => (
    <View style={{ width: '100%', height: 1, backgroundColor: '#BAC2CB', }} />
)


