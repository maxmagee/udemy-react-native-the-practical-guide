import React, { Component } from 'react';
import { Button, StyleSheet, Image, View } from 'react-native';

import imagePlaceholder from '../../assets/background.jpg';

class PickImage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={imagePlaceholder} style={styles.previewImage} />
                </View>
                <View style={styles.button}>
                    <Button title='Pick Image' onPress={() => alert('pick image')} />
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

export default PickImage;
