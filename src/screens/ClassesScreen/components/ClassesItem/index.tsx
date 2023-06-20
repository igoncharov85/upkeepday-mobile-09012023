import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import DocumentIcon from "../../../../../assets/svg/classes/DocumentIcon";
import EditIcon from "../../../../../assets/svg/classes/EditIcon";
import MailIcon from "../../../../../assets/svg/classes/MailIcon";
import ScheduledIcon from "../../../../../assets/svg/classes/ScheduledIcon";
import DotsIcon from "../../../../../assets/svg/classes/DotsIcon";
import PaymentIcon from "../../../../../assets/svg/classes/PaymentIcon";
import { NavigationEnum } from "../../../../common/constants/navigation";

import styles from "./styles";

const ClassesItem: React.FC = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={[styles.part, styles.partTop]}>
                <View>
                    <Text style={styles.title}>Music Class Name</Text>
                    <Text style={styles.text}>8/30/2022 - 9/30/2022</Text>
                    <View style={styles.payment}>
                        <View style={styles.paymentItem}>
                            <PaymentIcon />
                        </View>
                        <Text style={styles.underlineText}>Payment Tracking</Text>
                    </View>
                    <Text style={styles.text}>Total classes held: 14</Text>
                </View>
                <View>
                    <Text style={[styles.text, styles.textRight]}>Location Address</Text>
                    <Text style={[styles.text, styles.textRight]}>Teacher Name</Text>
                    <Text style={[styles.underlineText, styles.textRight]}>10 students</Text>
                    <Text style={[styles.text, styles.textRight]}>Scheduled classes: 20</Text>
                </View>
            </View>
            <View style={styles.part}>
                <View style={styles.link}>

                    <TouchableOpacity
                        style={styles.linkItem}
                        onPress={
                            //@ts-ignore
                            () => navigation.navigate(NavigationEnum.CLASSES_PREVIEW_SCREEN)
                        }
                    >
                        <DocumentIcon />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => console.log('5')} style={styles.linkItem}>
                        <EditIcon />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => console.log('6')} style={styles.linkItem}>
                        <MailIcon />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => console.log('6')} style={styles.linkItem}>
                        <ScheduledIcon />
                    </TouchableOpacity>

                </View>
                <View>
                    <TouchableOpacity
                        style={styles.linkItem}
                        onPress={
                            //@ts-ignore
                            () => navigation.navigate(NavigationEnum.EDIT_CLASS_SCREEN)
                        }>
                        <DotsIcon />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default ClassesItem;