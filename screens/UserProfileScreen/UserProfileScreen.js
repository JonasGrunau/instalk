import React from "react";
import {StyleSheet, View, Text} from "react-native";

const styles = StyleSheet.create({
    root: {
        flex: 1
    }
});

export default class UserProfileScreen extends React.PureComponent {
    render() {
        return (
            <View style={styles.root}>
                <Text>User Profile</Text>
            </View>
        );
    }
}