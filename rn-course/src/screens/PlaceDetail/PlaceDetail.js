import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const PlaceDetailScreen = props => {
    return (
        <View style={styles.container}>
            <View>
                <Image 
                    source={props.selectedPlace.image}
                    style={styles.placeImage} 
                />
                <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={props.onItemDeleted}>
                    <View style={styles.deleteButton}>
                        <Icon size={30} name={'ios-trash'} color='red' />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 22
    },
    deleteButton: {
        alignItems: 'center'
    },
    placeImage: {
        height: 200,
        width: '100%'
    },
    placeName: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default PlaceDetailScreen;
