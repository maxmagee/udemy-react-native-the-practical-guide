import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const DefaultInput = props => (
    <TextInput 
        style={styles.input} 
        underlineColorAndroid='transparent'
        {...props}
    />
);

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#eee',
        padding: 5,
        margin: 8,
        width: '100%'
    }
});

export default DefaultInput;
