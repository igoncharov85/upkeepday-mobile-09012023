import React, { FC, useCallback, useMemo } from "react";
import { View } from "react-native";
import { getStyles } from "./styles";
import { MainDropdown } from "../../../../components/UI/mainDropdown";

interface IProps {
    countries: string[];
    states: string[];
    country: string;
    state: string;
    setCountry: (value: string) => void;
    setState: (value: string) => void;
};


export const LocationDropdowns: FC<IProps> = ({ countries, states, country, state, setCountry, setState }) => {
    const styles = useMemo(() => getStyles(), []);
    
    const formatLocations = useCallback((value: string[]) => value?.map(item => ({ title: item })), []);

    const formattedCountries = useMemo(() => formatLocations(countries), [countries]);
    const formattedStates = useMemo(() => formatLocations(states), [states]);

    const onSetState = (value: { title: string }) => { setState(value.title) };
    const onSetCountry = (value: { title: string }) => { setCountry(value.title) };

    return (
        <View style={styles.container}>
            <MainDropdown
                title={"Country"}
                data={formattedCountries}
                selected={country}
                setSelected={onSetCountry}
                labelField={"title"}
                valueField={"title"}
                containerStyle={styles.dropdownOffset}
            />
            <MainDropdown
                title={"State"}
                data={formattedStates}
                placeholder={'Business Name'}
                selected={state}
                setSelected={onSetState}
                labelField={"title"}
                valueField={"title"}
                containerStyle={styles.dropdownOffset}
            />
        </View>
    );
};