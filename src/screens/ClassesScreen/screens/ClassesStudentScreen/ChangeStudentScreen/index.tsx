import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { IExistingStudent } from '../../../../../common/types/schedule.types';
import { ScreenHeader } from '../../../../../components/ScreenHeader';
import { useTypedNavigation } from '../../../../../hook/useTypedNavigation';
import { useAppSelector } from '../../../../../store/hooks';
import { dispatch } from '../../../../../store/store';
import { updateUserAction } from '../../../../../store/user/actions';
import { ListButtons } from '../../ClassesEditNameScreen/components/ListButtons';
import { ExistingStudent } from './ExistingStudent';
import { NewStudent } from './NewStudent';
import { removeDuplicateStudents } from '../../../../AddStudentsScreen';

interface IAddStudentsScreen { }

enum TypeAction {
  ExistingStudent = 0,
  NewStudent = 1,
}

function removeEmptyObjects(array: any[]) {
  return array.filter(obj => Object.keys(obj).length !== 0);
}

const ChangeStudentScreen: React.FC<IAddStudentsScreen> = () => {
  const { goBack, navigate } = useTypedNavigation();
  const route = useRoute();
  const { item, currentStudent }: any = route.params;

  const { students } = useAppSelector(state => state.user);
  const [typeAction, setTypeAction] = useState(0);
  const { createCurrentClassRequest } = useAppSelector(state => state.schedule);
  const [selectedStudents, setSelectedStudents] = useState<
    Array<IExistingStudent | any>
  >([]);
  const [existingStudent, setExistingStudent] = useState<Array<any>>(
    students || [],
  );
  const [newStudents, setNewStudents] = useState<Array<IExistingStudent>>([]);
  const [resultData, setResultData] = useState<any>({
    existingStudents: [],
    newStudents: [],
  });
  const goNextStep = () => {
    dispatch(
      updateUserAction({
        StudentId: item.ClassId,
        ExistingStudents: resultData.existingStudents,
        NewStudents: resultData.newStudents,
      }),
    );

    goBack();
  };
  const handleTypeChange = (type: any) => {
    setTypeAction(type);
  };
  const setThisScreen = () => {
    setTypeAction(TypeAction.ExistingStudent);
  };
  const handleChancheUsers = (student: IExistingStudent) => {
    setSelectedStudents(existingStudents => {
      //@ts-ignore
      if (student?.StudentId) {
        let index = existingStudents.some(
          //@ts-ignore
          event => event.StudentId === student?.StudentId,
        );
        //@ts-ignore
        const StudentId = student?.StudentId;
        if (index) {
          return existingStudents?.filter(
            event => event.StudentId !== StudentId,
          );
        } else {
          return [...existingStudents, { StudentId }];
        }
      } else {
        const index = existingStudents?.findIndex(
          event => event.Phone === student?.Phone,
        );
        if (index === -1) {
          return [...existingStudents, student];
        } else {
          return existingStudents?.filter((_, i) => i !== index);
        }
      }
    });
  };

  const handleAddNewStudent = (students: IExistingStudent) => {
    setNewStudents([...newStudents, students]);
    setSelectedStudents([...selectedStudents, students]);
  };
  useEffect(() => {
    setExistingStudent([...students, ...newStudents]);
  }, [newStudents]);

  useEffect(() => {
    let newStudentsData: any = [];
    let existingStudentsData: any = [];
    removeEmptyObjects(selectedStudents).forEach(item => {
      if (item?.StudentId) {
        existingStudentsData.push(item.StudentId);
      } else {
        newStudentsData.push(item);
      }
    });
    setResultData({
      newStudents: newStudentsData,
      existingStudents: existingStudentsData,
    });
  }, [selectedStudents, newStudents]);
  useEffect(() => {
    const { currentStudent }: any = route.params;
    const currentStudentArray = currentStudent.map((item: any) => {
      return { StudentId: item.StudentId };
    });
    setSelectedStudents(currentStudentArray);
  }, [currentStudent]);

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <View style={{ padding: 20, paddingBottom: 0 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ScreenHeader
            text={'Update Students '}
            onBackPress={goBack}
            withBackButton={true}
          />
        </View>

        <View style={{ marginTop: 0 }}>
          <ListButtons
            buttons={['Existing student', 'New Student']}
            onPress={handleTypeChange}
            index={typeAction}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingBottom: 12 }}>
          {typeAction === TypeAction.ExistingStudent ? (
            <ExistingStudent
              onSave={goNextStep}
              students={removeDuplicateStudents(existingStudent)}
              onChancheUsers={handleChancheUsers}
              selectedUsers={selectedStudents}
            />
          ) : (
            <NewStudent
              handleTypeChange={setThisScreen}
              onAddNewStudent={handleAddNewStudent}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default ChangeStudentScreen;
