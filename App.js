import React from "react";
import {createStackNavigator} from "react-navigation";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import UserListScreen from "./screens/UserListScreen/UserListScreen";
import UserProfileScreen from "./screens/UserProfileScreen/UserProfileScreen";

const StackNavigation = createStackNavigator({
    Home: HomeScreen,
    UserList: UserListScreen,
    UserProfile: UserProfileScreen
}, {
    initialRouteName: "Home"
});

export default class App extends React.PureComponent {
    render() {
        return (
            <StackNavigation/>
        );
    }
}