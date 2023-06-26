import React, { memo, useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";

import { CustomModal } from "../../../../../../components/UI/CustomModal";
import { ScreenHeader } from "../../../../../../components/ScreenHeader";
import styles from "./styles";
import { CustomButton } from "../../../../../../components/UI/CustomButton";
import { AddNewAddressModal } from "../AddNewAddressModal";
import { dispatch } from "../../../../../../store/store";
import { useAppSelector } from "../../../../../../store/hooks";
import { updateCurrentClassRequestAction } from "../../../../../../store/shedule";

interface IChooseAddressModal {
    visible: boolean;
    handleShowModal: () => void;
    handleClassLocation: (location: string, id: number) => void;
}

export const ChooseAddressModal: React.FC<IChooseAddressModal> = memo(({ visible, handleShowModal, handleClassLocation }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeId, setActiveId] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const { locations } = useAppSelector(state => state.location);

    useEffect(() => {
        activeId && dispatch(updateCurrentClassRequestAction({
            Location: { LocationId: +activeId }
        }))

    }, [activeId]);

    const onShowModal = () => {
        setModalVisible(!modalVisible);
        handleShowModal()
    };
    const handlePress = (index: number) => {
        setActiveIndex(index);
        handleClassLocation(locations[index].Name, +locations[index].LocationId)
        setActiveId(locations[index].LocationId)
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
                    <ScreenHeader text={"Choose Address"} onBackPress={handleShowModal} withBackButton={true} />
                </View>
                <DecorationLine />
                <ScrollView style={{ height: 125, }}>
                    {locations.map((item, index) => item.AddressLine && <AddressItem activeIndex={activeIndex} index={index} key={index} address={item.Name} onTouch={handlePress} />)}

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

const NewAddressButton = ({ addAddress }: { addAddress: () => void }) => {

    return (
        <TouchableOpacity style={styles.addressItem} onPress={() => addAddress()}>
            <Text style={[styles.textAddress]}>Add New Address</Text>
        </TouchableOpacity>
    )
}

const DecorationLine = () => (
    <View style={styles.decorationLine} />
)


