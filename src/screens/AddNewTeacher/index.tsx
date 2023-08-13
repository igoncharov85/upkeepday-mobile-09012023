import {useNavigation} from "@react-navigation/native";
import React from "react";
import {Text, View} from "react-native";
import {ScreenHeader} from "../../components/ScreenHeader";
import {CustomButton} from "../../components/UI/CustomButton";
import {CustomInput} from "../../components/UI/CustomInput";

export const AddNewTeacherScreen = () => {
	const {goBack} = useNavigation()
	return (
		<View style={{
			height: '100%'
		}}>
			<View style={{
				padding: 20
			}}>
				<ScreenHeader text="Add new Teacher"  withBackButton={true} onBackPress={goBack} />
			</View>
			<View style={{
				paddingHorizontal: 20
			}}>
				<CustomInput wrapperStyle={{marginTop:15}}
				             placeholder={'Anna'}
				             labelText={'First Name'}
				/>
				<CustomInput wrapperStyle={{marginTop:15}}
				             placeholder={'Asol'}
				             labelText={'Last Name'}
				/>
				<CustomInput wrapperStyle={{marginTop:15}}
				             placeholder={'your.email@gmail.com'}
				             labelText={'Email'}
				/>
				<CustomInput wrapperStyle={{marginTop:15}}
				             placeholder={'+1'}
				             labelText={'Phone'}
				/>
				<CustomInput wrapperStyle={{marginTop:15}}
				             placeholder={'View Schedule - cannot setup classes'}
				             labelText={'Type of Rights'}
				/>
				<CustomInput wrapperStyle={{marginTop:15}}
				             labelText={'Notes'}
				/>
			</View>
			<View style={{ flex: 1, padding: 20, justifyContent: 'flex-end' }}>
				<CustomButton text={'Next step'}  />
				<Text style={{
					textAlign: 'center',
					marginTop: 10,
					fontSize: 16,
					color: '#ccc',
				}}>
					Skip - Do later
				</Text>
			</View>
		</View>
	)
}