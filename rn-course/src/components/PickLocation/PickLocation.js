import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import MainText from '../UI/MainText/MainText';

class PickLocation extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <MainText>Map</MainText>
                </View>
                <View style={styles.button}>
                    <Button title='Locate Me' onPress={() => alert('locate me')} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        margin: 8
    },
    container: {
        alignItems: 'center',
        width: '100%'
    },
    placeholder: {
        backgroundColor: '#eee',
        borderColor: 'black',
        borderWidth: 1,
        height: 150,
        width: '80%'
    },
    previewImage: {
        height: '100%',
        width: '100%'
    }
});

export default PickLocation;
