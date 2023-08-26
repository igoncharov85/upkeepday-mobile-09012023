import React, { useEffect, useState } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import SearchIcon from "../../../../assets/svg/SearchIcon";
import BackIcon from "../../../../assets/svg/BackIcon";
import Cancel from "../../../../assets/svg/Cancel";
import { styles } from "./styles";
import { useAppSelector } from "../../../store/hooks";
import { dispatch } from "../../../store/store";
import { setFinderCurrentEntriesAction } from "../../../store/shedule";

const SearchInput = ({ editMode }: { editMode: any }) => {
    const { CurrentScheduledEntries } = useAppSelector(state => state.schedule);
    const [searchText, setSearchText] = useState(""); // Состояние для хранения введенного текста поиска


    const handleSearchTextChange = (text: string) => {
        setSearchText(text);
    };
    const cleanText = () => {
        setSearchText('');
    };
    const searchAndLogResults = () => {
        const searchResults = CurrentScheduledEntries.filter((entry: any) =>
            entry.ClassName.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
        );
        dispatch(setFinderCurrentEntriesAction(searchResults))
        console.log("Search Results:", searchResults);
    };
    useEffect(() => {
        console.log('открыли поиск');
        dispatch(setFinderCurrentEntriesAction(CurrentScheduledEntries))
        return () => {
            dispatch(setFinderCurrentEntriesAction(CurrentScheduledEntries))
            console.log('закрыли поиск');
        }
    }, [])
    return (
        <View style={{ flex: 1, maxHeight: 36 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={editMode}>
                    <BackIcon />
                </TouchableOpacity>
                <View style={styles.input}>
                    <TouchableOpacity onPress={searchAndLogResults}>
                        <SearchIcon />
                    </TouchableOpacity>
                    <TextInput
                        style={{
                            flex: 1,
                            paddingLeft: 22
                        }}
                        value={searchText}
                        onChangeText={handleSearchTextChange}
                        onEndEditing={searchAndLogResults}
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
