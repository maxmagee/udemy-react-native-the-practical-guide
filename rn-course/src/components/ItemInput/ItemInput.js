import React from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

const ItemInput = (props) => (
    <View style={styles.inputContainer}>
        <TextInput 
            onChangeText={props.placeNameChangedHandler}
            placeholder='An Awesome Place'
            style={styles.placeInput}
            value={props.placeName} 
        />
        <Button 
            onPress={props.placeSubmitHandler}
            style={styles.placeButton}
            title='Add'
        />
    </View>
);

const styles = StyleSheet.create({
    inputContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    placeInput: {
        width: '70%'
    },
    placeButton: {
        width: '30%'
    }
});

export default ItemInput;
