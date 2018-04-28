import React, { Component } from 'react';
import { Button, ImageBackground, StyleSheet, View } from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';

import backgroundImage from '../../assets/background.jpg';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';

class AuthScreen extends Component {
    loginHandler = () => {
        startMainTabs();
    }
    
    render() {
        return (
            <ImageBackground 
                source={backgroundImage} 
                style={styles.backgroundImage}
            >
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Please Log In</HeadingText>
                    </MainText>
                    <Button title='Switch to Login' />
                    <View style={styles.inputContainer}>
                        <DefaultInput style={styles.input} placeholder='Your E-Mail Address' />
                        <DefaultInput style={styles.input} placeholder='Password' />
                        <DefaultInput style={styles.input} placeholder='Confirm Password' />
                    </View>
                    <Button title='Submit' onPress={this.loginHandler} />
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%'
    },
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb'
    },
    inputContainer: {
        width: '80%'
    }
});

export default AuthScreen;
