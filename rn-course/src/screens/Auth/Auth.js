import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';

class AuthScreen extends Component {
    loginHandler = () => {
        startMainTabs();
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>Please Log In</Text>
                <Button title='Switch to Login' />
                <View style={styles.inputContainer}>
                    <DefaultInput style={styles.input} placeholder='Your E-Mail Address' />
                    <DefaultInput style={styles.input} placeholder='Password' />
                    <DefaultInput style={styles.input} placeholder='Confirm Password' />
                </View>
                <Button title='Submit' onPress={this.loginHandler} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
