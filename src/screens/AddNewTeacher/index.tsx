import React, { FC, useMemo } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { ScreenHeader } from "../../components/ScreenHeader";
import { CustomButton } from "../../components/UI/CustomButton";
import { CustomInput } from "../../components/UI/CustomInput";
import { useAddNewTeacher } from "./presenters/useAddNewTeacher";
import { MainDropdown } from "../../components/UI/mainDropdown";
import { ScreenContainer } from "../../components/UI/screenContainer";
import { Utils } from "../../services/utils/Utils";
import { getStyles } from "./styles";

const PERMISSIONS = [
	{ label: 'View Schedule - cannot setup classes', value: 'ViewOwnSchedule' },
	{ label: 'Manage own schedule', value: 'ManageOwnSchedule' },
	{ label: 'Manage schedule', value: 'ManageSchedule' },
	{ label: 'Full access', value: 'FullAccess' },
]

export const AddNewTeacherScreen: FC = () => {
	const styles = useMemo(() => getStyles(), []);
	const {
		name, lastName, email, phone, permission, notes, isValid,
		setName, setLastName, setEmail, setPhone, setPermission, setNotes, goBack, onAddTeacher
	} = useAddNewTeacher();

	return (
		<KeyboardAvoidingView behavior={Utils.isIOS ? 'padding' : undefined} style={styles.container}>
			<ScreenContainer scrollEnabled headerComponent={<ScreenHeader containerStyle={styles.header} text="Add new Teacher" withBackButton={true} onBackPress={goBack} />}>
				<View style={styles.formWrapper}>
					<CustomInput
						wrapperStyle={styles.input}
						placeholder={'Anna'}
						labelText={'First Name'}
						value={name}
						onChangeText={setName}
						touched={!!name}
					/>
					<CustomInput
						wrapperStyle={styles.input}
						placeholder={'Asol'}
						labelText={'Last Name'}
						value={lastName}
						onChangeText={setLastName}
						touched={!!lastName}
					/>
					<CustomInput
						wrapperStyle={styles.input}
						placeholder={'your.email@gmail.com'}
						labelText={'Email'}
						value={email}
						onChangeText={setEmail}
						touched={!!email}
					/>
					<CustomInput
						wrapperStyle={styles.input}
						placeholder={'+1'}
						labelText={'Phone'}
						value={phone}
						onChangeText={setPhone}
						touched={!!phone}
					/>
					<MainDropdown
						fullScreen={true}
						data={PERMISSIONS}
						selected={permission}
						setSelected={setPermission}
						valueField={'value'}
						labelField={'label'}
						title={'Type of Rights'}
						containerStyle={styles.input}
					/>
					<CustomInput
						wrapperStyle={styles.input}
						labelText={'Notes'}
						value={notes}
						onChangeText={setNotes}
						touched={!!notes}
					/>
				</View>
				<CustomButton style={styles.button} disabled={!isValid} text={'Save Teacher'} onPress={onAddTeacher} />
			</ScreenContainer>
		</KeyboardAvoidingView>
	);
};