import React, { Component } from 'react';
import { Button, Platform, StyleSheet, Image, View } from 'react-native';
import RNImagePicker from 'react-native-image-picker';
import ImagePickerAndroidWrapper from '../../utility/ImagePicker';

class PickImage extends Component {
    state = {
        pickedImage: null
    }

    pickImageHandler = () => {
        const ImagePicker = Platform.OS === 'ios' ? RNImagePicker : ImagePickerAndroidWrapper;

        ImagePicker.showImagePicker({ title: 'Pick an Image' }, response => {
            if (response.didCancel) {
                console.log('User cancelled!');
            } else if (response.error) {
                console.error('Error', response.error);
            } else {
                this.setState({
                    pickedImage: { uri: response.uri }
                });
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={this.state.pickedImage} style={styles.previewImage} />
                </View>
                <View style={styles.button}>
                    <Button title='Pick Image' onPress={this.pickImageHandler} />
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
