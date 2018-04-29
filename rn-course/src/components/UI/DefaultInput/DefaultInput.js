import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const DefaultInput = props => (
    <TextInput 
        underlineColorAndroid='transparent'
        {...props}
        style={[styles.input, props.style]}     // merges styles allowing overriding
    />
);

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#eee',
        padding: 5,
        marginBottom: 8,
        marginTop: 8,
        width: '100%'
    }
});

export default DefaultInput;
