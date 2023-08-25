import React, { memo, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { CustomModal } from "../../../../components/UI/CustomModal";
import { ScreenHeader } from "../../../../components/ScreenHeader";
import styles from "./styles";
import { CustomButton } from "../../../../components/UI/CustomButton";
import { AddNewAddressModal } from "../../../AddClassScreen/components/AddNewAddressModal";

interface IChooseAddressModal {
    title: string;
    locations: any[];
    visible: boolean;
    handleShowModal: () => void;
    handleClassLocation: (location?: any) => void;
}

export const ChooseAddressModal: React.FC<IChooseAddressModal> = memo(({ title, locations, visible, handleShowModal, handleClassLocation }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false)

    const onShowModal = () => {
        setModalVisible(!modalVisible);
        handleShowModal()
    };

    const handlePress = (index: number) => {
        setActiveIndex(index);
        handleClassLocation(locations?.[index]);
        handleShowModal()
    };

    return (
        <>
            <AddNewAddressModal visible={modalVisible} handleShowModal={onShowModal} />
            <CustomModal isVisible={visible} closeModal={handleShowModal} height={350}>
                <View style={{
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                }}>
                    <ScreenHeader text={title} onBackPress={handleShowModal} withBackButton={true} />
                </View>
                <DecorationLine />
                <ScrollView style={{ height: 125, }}>
                    {locations.map((item, index) => item.AddressLine && <AddressItem activeIndex={activeIndex} index={index} key={index} address={`${item.AddressLine}, ${item.City}, ${item.State}, ${item.Country} ${item.PostalCode}`} onTouch={handlePress} />)}
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
)

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

const DecorationLine = () => (
    <View style={styles.decorationLine} />
);


