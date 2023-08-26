import React, { useEffect, useState } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import SearchIcon from "../../../../assets/svg/SearchIcon";
import BackIcon from "../../../../assets/svg/BackIcon";
import Cancel from "../../../../assets/svg/Cancel";
import { styles } from "./styles";
import { useAppSelector } from "../../../store/hooks";
import { dispatch } from "../../../store/store";
import { setFinderCurrentEntriesAction } from "../../../store/shedule";
import { useRoute } from "@react-navigation/native";
import { NavigationEnum } from "../../../common/constants/navigation";
import { setFinderClassesAction } from "../../../store/classes";
import { setFindUsersAction } from "../../../store/user";
interface IFindState {
    name: string;
    state: any[];
    updateAction: any;
    searchCondition: any;
}
const SearchInput = ({ editMode }: { editMode: any }) => {
    const { CurrentScheduledEntries } = useAppSelector(state => state.schedule);
    const { classes } = useAppSelector(state => state.classes);
    const [searchText, setSearchText] = useState("");
    const { users } = useAppSelector(state => state.user);
    const route = useRoute();
    const findState: IFindState[] = [
        {
            name: NavigationEnum.SCHEDULE_TAB,
            state: CurrentScheduledEntries,
            updateAction: setFinderCurrentEntriesAction,
            searchCondition: (item: any, searchText: string) => {
                return item.ClassName?.toLocaleLowerCase()?.includes(searchText?.toLocaleLowerCase())
            }
        },
        {
            name: NavigationEnum.CLASSES_TAB,
            state: classes,
            updateAction: setFinderClassesAction,
            searchCondition: (item: any, searchText: string) => {
                return item.Name?.toLocaleLowerCase()?.includes(searchText?.toLocaleLowerCase())
            }
        },
        {
            name: NavigationEnum.STUDENTS_TAB,
            state: users,
            updateAction: setFindUsersAction,
            searchCondition: (item: any, searchText: string) => {
                return `${item.FirstName} ${item.LastName}`?.toLocaleLowerCase()?.includes(searchText?.toLocaleLowerCase())
            }
        },
    ]
    const currentOption = findState.find(item => item.name == route.name) || findState[0]


    const handleSearchTextChange = (text: string) => {
        setSearchText(text);
        searchAndLogResults(text)
    };
    const cleanText = () => {
        setSearchText('');
        dispatch(currentOption.updateAction(currentOption.state))
    };
    const searchAndLogResults = (searchText: string) => {
        const searchResults = currentOption.state?.filter((entry: any) => currentOption.searchCondition(entry, searchText));
        dispatch(currentOption.updateAction(searchResults))
    };
    useEffect(() => {
        dispatch(currentOption.updateAction(currentOption.state))
        return () => {
            dispatch(currentOption.updateAction(currentOption.state))
        }
    }, [])
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <TouchableOpacity onPress={editMode}>
                    <BackIcon />
                </TouchableOpacity>
                <View style={styles.input}>
                    <TouchableOpacity onPress={() => searchAndLogResults(searchText)}>
                        <SearchIcon />
                    </TouchableOpacity>
                    <TextInput
                        style={{
                            flex: 1,
                            paddingLeft: 22
                        }}
                        value={searchText}
                        onChangeText={(event) => handleSearchTextChange(event)}
                    />
                    <TouchableOpacity onPress={cleanText}>
                        <Cancel />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default SearchInput;
