import {useNavigation} from "@react-navigation/native";
import React from "react";
import {Text, View} from "react-native";
import {NavigationEnum} from "../../common/constants/navigation";
import {ScreenHeader} from "../../components/ScreenHeader";
import {CustomButton} from "../../components/UI/CustomButton";
import {CustomInput} from "../../components/UI/CustomInput";

export const AddBusinessAccountScreen = () => {
	const {goBack, navigate} = useNavigation()
	return (
				<View style={{
					height: '100%'
				}}>
						<View style={{
								padding: 20
						}}>
							<ScreenHeader text="Add Business Account"  withBackButton={true} onBackPress={goBack} />
						</View>
					<View style={{
							paddingHorizontal: 20
					}}>
					<CustomInput wrapperStyle={{marginTop:10}}
						placeholder={'Name'}
						labelText={'Business Name'}
					/>
						<CustomInput wrapperStyle={{marginTop:10}}
							placeholder={'+1'}
							labelText={'Phone Number'}
						/>
						<CustomInput wrapperStyle={{marginTop:10}}
							placeholder={'Address Text'}
							labelText={'Address Line 1'}
						/>
						<CustomInput wrapperStyle={{marginTop:10}}
 							placeholder={'City Name'}
							labelText={'City'}
						/>
						<View style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginTop: 10
						}}>
							<CustomInput wrapperStyle={{ width: '45%', }}
							             placeholder={'USA'}
							             labelText={'Country'}
							/>
							<CustomInput wrapperStyle={{ width: '45%'}}
							             placeholder={'Business Name'}
							             labelText={'State'}
							/>
						</View>
						<CustomInput wrapperStyle={{marginTop:10}}
						             placeholder={'113245'}
						             labelText={'Postal Code'}
						/>
					</View>
						<View style={{ flex: 1, padding: 20, justifyContent: 'flex-end' }}>
							{/*// @ts-ignore*/}
							<CustomButton text={'Next step'} onPress={() =>navigate(NavigationEnum.ADD_NEW_TEACHER_SCREEN)}  />
						</View>
				</View>
		)
}