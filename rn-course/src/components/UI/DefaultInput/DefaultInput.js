import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const DefaultInput = props => (
    <TextInput 
        underlineColorAndroid='transparent'
        {...props}
        style={[
            styles.input, 
            props.style,
            !props.valid && props.touched ? styles.invalid : null
        ]}     // merges styles allowing overriding
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
    },
    invalid: {
        backgroundColor: '#f9c0c0',
        borderColor: 'red'
    }
});

export default DefaultInput;
