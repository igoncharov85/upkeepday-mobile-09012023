import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';
import { NavigationEnum } from '../../common/constants/navigation';
import { ScheduleScreen } from '../../screens/SheduleScreen';
import Classes from '../../../assets/svg/schedule/Classes';
import More from '../../../assets/svg/schedule/More';
import Schedule from '../../../assets/svg/schedule/Schedule';
import Todo from '../../../assets/svg/schedule/Todo';
import { SchedulePlus } from '../../screens/SheduleScreen/components/SchedulePlus';
import { SheduleHeader } from '../../screens/SheduleScreen/components/SheduleHeader';
import { ClassesScreen } from '../../screens/ClassesScreen';
import { MoreScreen } from '../../screens/MoreScreen';
import { TeacherIcon } from '../../../assets/svg/teacherIcon';
import { TeachersScreen } from '../../screens/SchoolTeachers/UI/TeachersScreen';

const Tab = createBottomTabNavigator();

export const SchoolTabNavigator = () => {
    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        height: 80,
                        paddingHorizontal: 20,
                    },
                    header: ({ route, options }) => {
                        const title = getHeaderTitle(options, route.name);
                        return <SheduleHeader text={title} />;
                    },
                    tabBarActiveTintColor: '#171930',
                    tabBarInactiveTintColor: '#BAC2CB',
                    tabBarItemStyle: {
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 8,
                        paddingVertical: 16,
                    },
                }}
            >
                <Tab.Screen
                    name={NavigationEnum.SCHEDULE_TAB}
                    component={ScheduleScreen}
                    options={{
                        header: ({ route, options }) => {
                            const title = getHeaderTitle(options, route.name);
                            return <SheduleHeader isSelection />;
                        },
                        title: "Schedule",
                        tabBarLabel: 'Schedule',
                        tabBarIcon: ({ color, size }) => (<Schedule name="calendar" size={size} color={color} />),
                    }}
                />
                <Tab.Screen
                    name={NavigationEnum.TO_DO_TAB}
                    component={ScheduleScreen}
                    options={{
                        title: "To Do",
                        tabBarLabel: 'To Do',
                        tabBarIcon: ({ color, size }) => (<Todo name="calendar" size={size} color={color} />),
                    }}
                />
                <Tab.Screen
                    name={NavigationEnum.CLASSES_TAB}
                    component={ClassesScreen}
                    options={{
                        title: "Classes",
                        tabBarLabel: 'Classes',
                        tabBarIcon: ({ color, size }) => (<Classes name="calendar" size={size} color={color} />),
                    }}
                />
                <Tab.Screen
                    name={NavigationEnum.TEACHERS_TAB}
                    component={TeachersScreen}
                    options={{
                        header: ({ route, options }) => {
                            const title = getHeaderTitle(options, route.name);
                            return <SheduleHeader isSelection text={title} />;
                        },
                        title: "Teachers",
                        tabBarLabel: 'Teachers',
                        tabBarIcon: ({ color }) => (<TeacherIcon color={color} />),
                    }}
                />
                <Tab.Screen
                    name={NavigationEnum.MORE_TAB}
                    component={MoreScreen}
                    options={{
                        title: "More",
                        tabBarLabel: 'More',
                        tabBarIcon: ({ color, size }) => (<More name="calendar" size={size} color={color} />),
                    }}
                />
            </Tab.Navigator>
            <SchedulePlus />
        </>
    );
};
