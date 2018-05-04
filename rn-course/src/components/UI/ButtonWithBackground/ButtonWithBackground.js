import React from 'react';
import {
    Platform,
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    TouchableNativeFeedback, 
    View 
} from 'react-native';

const ButtonWithBackground = props => {
    const content = (
        <View 
            style={[
                styles.button, 
                { backgroundColor: props.color },
                props.disabled ? styles.disabled : null
            ]} 
        >
            <Text style={props.disabled ? styles.disabledText : null}>{props.children}</Text>
        </View>
    );

    if (props.disabled) {
        return content;
    }

    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback onPress={props.onPress}>
                {content}
            </TouchableNativeFeedback>
        );
    }
    
    return (   
        <TouchableOpacity onPress={props.onPress}>
            {content}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
        margin: 5,
        padding: 10
    },
    disabled: {
        backgroundColor: '#eee',
        borderColor: '#aaa'
    },
    disabledText: {
        color: '#aaa'
    }
});

export default ButtonWithBackground;
