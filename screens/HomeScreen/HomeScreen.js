import React from "react";
import {StyleSheet, View, Text} from "react-native";
import {theme} from "../../resources/theme";
import {strings} from "../../resources/strings";

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: theme.colors.white,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        marginBottom: 30,
        marginTop: 30,
        width: 260,
        alignItems: "center",
        backgroundColor: theme.colors.blue
    },
    buttonText: {
        padding: 20,
        color: "white"
    }
});

export default class HomeScreen extends React.PureComponent {
    static navigationOptions = {
        title: strings.appName,
        headerStyle: {
            backgroundColor: theme.colors.red,
        },
        headerTintColor: theme.colors.white,
        headerTitleStyle: {
            fontWeight: "bold",
        },
    };

    state = {
        isLoading: true,
        text: null,
        imageLink: null,
        searchQuery: null,
        userList: []
    };

    handlePress = () => {
        let userList = [];

        // this.props.navigation.navigate('Imageview',"https://www.instagram.com/web/search/topsearch/?context=blended&query=@"+this.state.query )

        fetch("https://www.instagram.com/web/search/topsearch/?context=blended&query=@" + this.state.searchQuery)
            .then(response => response.json())
            .then(data => {
                data.users.forEach((element, index) => {
                    userList.push({
                        key: index,
                        name: element.user.username,
                        imgUrl: element.user.profile_pic_url,
                        pk: element.user.pk
                    })
                });

                this.setState({userList, isLoading: false}, () => {
                    this.props.navigation.navigate("UserList", this.state.userList);
                });
            })
            .catch(error => this.setState({error, isLoading: false}));
    };

    render() {
        const {isLoading, searchQuery} = this.state;
        const data = ["lu_as_", "drei", "wie gehts"];

        if (isLoading) {
            return null;
        }

        return (
            <View style={styles.root}>
                <Autocomplete
                    data={data}
                    inputContainerStyle={{width: 200}}
                    defaultValue={searchQuery}
                    hideResults={true}
                    onChangeText={text => this.setState({query: text})}
                    renderItem={item => (
                        <TouchableOpacity onPress={() => this.setState({query: item})}>
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
                <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Show me!</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}