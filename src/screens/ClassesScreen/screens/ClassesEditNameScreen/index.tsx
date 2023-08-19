import { Formik, FormikProps } from 'formik';
import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { NavigationEnum } from '../../../../common/constants/navigation';
import { formicDefaultProps } from '../../../../common/constants/styles/form.config';
import { AddClassNameSchema } from '../../../../common/shemas/addClass.shape';
import { ScreenHeader } from '../../../../components/ScreenHeader';
import { CustomButton } from '../../../../components/UI/CustomButton';
import { useTypedNavigation } from '../../../../hook/useTypedNavigation';
import { useTypedRoute } from '../../../../hook/useTypedRoute';
import { editNameClassesAction } from '../../../../store/classes/actions';
import { useAppSelector } from '../../../../store/hooks';
import { fetchLocationAction } from '../../../../store/location/actions';
import { ChooseAddressModal } from './components/ChooseAddressModal';
import { InputForm } from './components/InputForm';
import { ListButtons } from './components/ListButtons';

import { LocationSelect } from './components/LocationSelect';
import styles from './styles';
import { useRoute } from '@react-navigation/native';

interface IAddClassScreen { }

enum TypeLocation {
  Online = 0,
  InPerson = 1,
}

let windowHeight: any;
if (Platform.OS === 'ios') {
  windowHeight = Dimensions.get('window').height - 80;
} else {
  windowHeight = Dimensions.get('window').height - 20;
}

const ClassesEditNameScreen: React.FC<IAddClassScreen> = memo(() => {
  const { navigate, goBack } = useTypedNavigation();
  const { params } = useRoute();
  const item = params as any;
  console.log(params, 'params')
  const dispatch = useDispatch();
  const formInitialValues = {
    name: item?.Name,
    locationType: item.Location.LocationType,
    addressLine: item.Location.Address,
    url: '',
    locationId: item.Location.LocationId,
  };
  const { locations } = useAppSelector(state => state.location);
  const [typeLocation, setTypeLocation] = useState<TypeLocation>(
    item.Location.LocationType === 'Online'
      ? TypeLocation.Online
      : TypeLocation.InPerson,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [classLocation, setClassLocation] = useState(
    item.Location.Address || '',
  );
  const [locationId, setLocationId] = useState(item.Location.LocationId);

  const handleShowModal = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  const handleTypeChange = useCallback((type: TypeLocation) => {
    setTypeLocation(type);
  }, []);

  const handleClassLocation = useCallback((location: string, id: number) => {
    setClassLocation(location);
    setLocationId(id);
  }, []);

  const renderForm = useCallback(
    ({
      values,
      handleChange,
      handleSubmit,
      isValid,
      setFieldValue,
    }: FormikProps<typeof formInitialValues>) => {
      useEffect(() => {
        setFieldValue('addressLine', classLocation);
      }, [classLocation]);

      useEffect(() => {
        setFieldValue('locationId', locationId);
      }, [locationId]);

      return (
        <>
          <View style={{ marginTop: 12 }}>
            <InputForm
              labelText="Name"
              value={values.name}
              //@ts-ignore
              onChange={handleChange('name')}
            />
            <ListButtons
              buttons={['Online', 'In-person']}
              label="Class Type"
              onPress={handleTypeChange}
              index={typeLocation}
            />
            {typeLocation === TypeLocation.Online ? (
              <InputForm
                labelText="Online Instructions"
                multiline={true}
                value={values.url}
                style={{ height: 300, textAlignVertical: 'top' }}
                //@ts-ignore
                onChange={handleChange('url')}
              />
            ) : (
              <LocationSelect
                value={classLocation}
                onChange={handleShowModal}
                labelText="Class Location"
              />
            )}

            <ChooseAddressModal
              visible={modalVisible}
              handleShowModal={handleShowModal}
              handleClassLocation={handleClassLocation}
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%' }}>
            <CustomButton
              text={'Finish'}
              //@ts-ignore
              onPress={handleSubmit}
              disabled={!isValid}
            />
          </View>
        </>
      );
    },
    [
      typeLocation,
      classLocation,
      modalVisible,
      handleShowModal,
      handleTypeChange,
      handleClassLocation,
    ],
  );

  const handleSubmit = useCallback(
    (values: any) => {
      const Location = values.url
        ? { LocationId: values.locationId, Url: values.url }
        : { LocationId: values.locationId };
      navigate(NavigationEnum.RESULT_CLASS_MODAL, {
        item: {
          ...item,
          Name: values.name,
          Location: {
            LocationType:
              typeLocation == TypeLocation.InPerson ? 'Office' : 'Online',
            Url: typeLocation == TypeLocation.InPerson ? '' : values.url,
            LocationId: values.locationId,
            Address: values.addressLine,
          },
        },

        actionBtn: () => {
          dispatch(
            editNameClassesAction({
              id: item.ClassId,
              Class: { Name: values.name },
              Location: Location,
            }),
          );
          goBack();
          navigate(NavigationEnum.CLASSES_TAB);
        },
        nameAction: 'Confirm',
      });
    },
    [dispatch, typeLocation],
  );
  useEffect(() => {
    dispatch(fetchLocationAction());
  }, []);

  return (
    <KeyboardAvoidingView behavior="height">
      <ScrollView>
        <View style={[styles.container, { height: windowHeight - 20 }]}>
          <ScreenHeader
            onBackPress={goBack}
            text="Edit Class"
            withBackButton={true}
          />
          <Formik
            enableReinitialize={true}
            initialValues={formInitialValues}
            validationSchema={AddClassNameSchema}
            onSubmit={handleSubmit}
            {...formicDefaultProps}>
            {renderForm}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

export default ClassesEditNameScreen;
