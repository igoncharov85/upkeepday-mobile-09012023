import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";



export const ScreenLoading = () => (
    <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', height: '100%' }}>
        <ActivityIndicator
            style={StyleSheet.absoluteFill}
            color={'#9A80BA'}
            size="large"
        /></View>
)