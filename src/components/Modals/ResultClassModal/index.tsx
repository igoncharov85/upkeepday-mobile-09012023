import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { CustomButton } from '../../UI/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import PaymentIcon from '../../../../assets/svg/classes/PaymentIcon';
import { formatDateForPeriod } from '../../../services/utils/fullDateToValue.util';
import { dispatch } from '../../../store/store';
import { fetchClassesAction } from '../../../store/classes/actions';



const ResultClassModal = () => {
    const navigation = useNavigation();
    const route = useRoute(),
        { params }: any = route;


    const closeModal = () => {
        navigation.goBack();
    }
    const { item, actionBtn, nameAction } = params;

    const handleAction = () => {
        actionBtn();
        closeModal();
        dispatch(fetchClassesAction(item.Status.toLowerCase()))
    }

    return (
        <>
            <TouchableOpacity onPress={closeModal} style={styles.modalWrapper} activeOpacity={1}>
                <LinearGradient
                    colors={['rgba(178, 178, 178, 0.88)', 'rgba(23, 25, 48, 0.898039)']}
                    start={{ x: 0.0, y: 1.0 }}
                    end={{ x: 1.0, y: 0.0 }}
                    angle={223.05}
                    useAngle={true}
                    style={styles.container}>
                    <View />
                    <View style={styles.content}>
                        <View style={styles.container}>
                            <View />
                            <View style={styles.item}>
                                {item.Name ?
                                    (<View>
                                        <Text style={styles.title}>{item.Name}</Text>
                                        <Text style={styles.text}>{formatDateForPeriod(item.StartDate)} - {formatDateForPeriod(item.EndDate)}</Text>
                                        <Text style={styles.text}>Scheduled classes: {item.ScheduledClasses}</Text>
                                        <Text style={styles.text}>Total classes held: {item.TotalClassesHeld}</Text>
                                        <Text style={styles.text}>{item.Students.length} students</Text>
                                        <Text style={styles.text}>{item.Location.Address || 'Location Address'}</Text>
                                        <View style={styles.payment}>
                                            <View style={styles.paymentItem}>
                                                <PaymentIcon active={item.TrackPrepayment} />
                                            </View>
                                            <Text style={styles.underlineText}>Payment Tracking</Text>
                                        </View>
                                    </View>) : (<Text>Class not found</Text>)}
                            </View>
                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <CustomButton text={nameAction} onPress={handleAction} />
                                <TouchableOpacity onPress={closeModal} >
                                    <Text style={styles.cancel}>Cancel</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </LinearGradient >
            </TouchableOpacity >

        </>
    )
}


export default ResultClassModal;
