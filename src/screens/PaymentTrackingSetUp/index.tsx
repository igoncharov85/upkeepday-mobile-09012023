import {useNavigation, useRoute} from "@react-navigation/native";
import React from 'react';
import { keyboardSettings } from '../../common/constants/styles/keyboard';
import { KeyboardAvoidingView, Text, ScrollView, View } from 'react-native';
import {NavigationEnum} from "../../common/constants/navigation";
import {IGeneratedScheduleEntries, IStudents, IWeekTimeSlot} from "../../common/types/schedule.types";
import {ScreenHeader} from "../../components/ScreenHeader";
import {CustomButton} from "../../components/UI/CustomButton";
import {findLatestLessonWithDuration} from "../../services/utils/calculateNumberOfClasses";
import {useAppSelector} from "../../store/hooks";
import {createScheduleAction} from "../../store/shedule/actions";
import {dispatch} from "../../store/store";
import {InputForm} from "../AddClassScreen/components/InputForm";
import {CircleButton,} from "../PrepaymentConfigurationScreen/ListGradientCircleButtons";

interface IPaymentTrackingSetUp {
	makeupRequired: number;
	trackPrepayment: number;
}

export const PaymentTrackingSetUp: React.FC = () => {
	const route = useRoute();
	const { makeupRequired, trackPrepayment } = route.params as IPaymentTrackingSetUp
	console.log('trackPrepayment', trackPrepayment, 'makeupRequired', makeupRequired)
	const {navigate, goBack} = useNavigation();
	const [activeIndex, setActiveIndex] = React.useState(0);
	const [activeAmount, setActiveAmount] = React.useState<number>(0);
	const { createCurrentClassRequest } = useAppSelector(state => state.schedule)
	const location = createCurrentClassRequest.Location?.LocationType === "Online" ? {
		LocationType: createCurrentClassRequest.Location?.LocationType,
		Url: createCurrentClassRequest.Location?.Url
	} : {
		LocationId: createCurrentClassRequest.Location?.LocationId,
	}
	const goTextStep = () => {
		// @ts-ignore
		const endDate = findLatestLessonWithDuration(createCurrentClassRequest?.Sessions);
		console.log('createCurrentClassRequest', createCurrentClassRequest)
		//@ts-ignore
		navigate('navigation/RESULT_CLASS_MODAL', {
			item: {
				Name: createCurrentClassRequest.Class?.Name,
				StartDate: createCurrentClassRequest.Class?.StartDate,
				EndDate: endDate,
				ScheduledClasses: createCurrentClassRequest.Sessions?.length,
				TotalClassesHeld: 0,
				Students: createCurrentClassRequest.Students,
				Location: {
					Address: createCurrentClassRequest.Location?.AddressLine,
				},
				TrackPrepayment: !trackPrepayment as boolean,
			},
			actionBtn: () => {
				dispatch(createScheduleAction(
					{
						Class: {
							Name: createCurrentClassRequest.Class?.Name,
							StartDate: createCurrentClassRequest.Class?.StartDate,
							EndDate: createCurrentClassRequest.Class?.EndScheduleType == 'SpecificEndDate' ? createCurrentClassRequest.Class?.EndDate : undefined,
							EndNumber: createCurrentClassRequest.Class?.EndScheduleType != 'SpecificEndDate' ? createCurrentClassRequest.Class?.EndNumber : undefined,
							EndScheduleType: createCurrentClassRequest.Class?.EndScheduleType,
							MakeupRequired: !makeupRequired as boolean,
							TrackPrepayment: !trackPrepayment as boolean,
							PaymentAmount: Number(activeAmount),
							PaymentType: activeIndex == 0 ? 'FixedAmount' : 'PayPerSession'
						},
						Location: location,
						Students: createCurrentClassRequest.Students as IStudents[],
						Slots: createCurrentClassRequest.Slots as IWeekTimeSlot[],
						Sessions: createCurrentClassRequest.Sessions as IGeneratedScheduleEntries[],
					}
				))
				//@ts-ignore
				navigate(NavigationEnum.HOME_SCREEN, { key: Date.now() })
			},
			nameAction: 'Confirm',
		})
	};
	
console.log('activeAmount', activeAmount)
	return (
		<KeyboardAvoidingView {...keyboardSettings}>
        	<ScrollView>
				<View style={{ height: '100%' }}>
					<View style={{ padding: 20, paddingBottom: 0 }}>
						<ScreenHeader text={'Payment Configuration'} onBackPress={() => goBack()} withBackButton={true} />
					</View>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{
							fontSize: 18,
							lineHeight: 24,
			marginTop: 15,
						}}>Enter your payments term</Text>
					</View>
					<View style={{
						marginHorizontal: 20,
					}}>
					
					<CircleButton index={0} noLineDescription activeIndex={activeIndex} buttonTitle={
						{
							title: 'Fixed amount per period',
							subtitle: '(Does not apply to payments per session)'
						}
					} handlePress={() => {
						setActiveIndex(0)
					}}/>
					<View style={[
						activeIndex == 0 ? {display: 'flex'} : {display: 'none'},
						{justifyContent: 'space-between', flexDirection: 'row',  alignItems: 'center', marginTop: 10 }]}>
					<Text style={{
						fontSize: 24,
						fontWeight: 'bold',
					}}>
						Enter total amount
					</Text>
						<View style={{
							marginTop: -30,
						}}>
							<InputForm noMarginTop
								keyboardType="numeric"
								onChangeText={(text) => {
									setActiveAmount(Number(text))
								}}
								value={activeAmount.toString()}
								style={{ width: 70, height: 40, borderRadius: 10, borderWidth: 1,  borderColor: 'rgba(154, 128, 186,0.5)', textAlign: 'center'}}
							/>
						</View>
					</View>
						<CircleButton index={1} activeIndex={activeIndex} buttonTitle={
							{
								title: 'Per session',
								subtitle: ''
							}
						} handlePress={() => {
							setActiveIndex(1)
						}}/>
						<View style={[
							activeIndex == 1 ? {display: 'flex'} : {display: 'none'},
							{justifyContent: 'space-between', flexDirection: 'row',  alignItems: 'center', marginTop: 10 }]}>
							<Text style={{
								fontSize: 24,
								fontWeight: 'bold',
							}}>
								Enter rate per session
							</Text>
							<View style={{
								marginTop: -30,
							}}>
								<InputForm noMarginTop
										keyboardType="numeric"
										onChangeText={(text) => {
														setActiveAmount(Number(text))
										}}
										value={activeAmount.toString()}
										style={{ width: 70, height: 40, borderRadius: 10, borderWidth: 1,  borderColor: 'rgba(154, 128, 186,0.5)', textAlign: 'center'}}
								/>
							</View>
						</View>
					</View>
					<View style={{ flex: 1, padding: 20, justifyContent: 'flex-end' }}>
						<CustomButton text={'Save'} onPress={goTextStep} />
					</View>		
				</View >
			</ScrollView>
		</KeyboardAvoidingView>
	)
}
