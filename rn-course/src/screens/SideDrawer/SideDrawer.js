import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

class SideDrawerScreen extends Component {
    render() {
        return (
            <View
                style={[
                    styles.container,
                    { width: Dimensions.get('window').width * 0.8 }
                ]}
            >
                <Text>SideDrawer</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 20
    }
});

export default SideDrawerScreen;
