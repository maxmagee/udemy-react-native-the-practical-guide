import React from 'react';
import { Button, Image, Modal, StyleSheet, Text, View } from 'react-native';

const PlaceDetail = props => {
    let modalContent = null;

    if (props.selectedPlace) {
        modalContent = (
            <View>
                <Image 
                    source={props.selectedPlace.image}
                    style={styles.placeImage} 
                />
                <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
            </View>
        );
    }
    return (
        <Modal 
            animationType='slide'    
            onRequestClose={props.onModalClosed} 
            visible={props.selectedPlace !== null} 
        >
            <View style={styles.modalContainer}>
                {modalContent}
                <View>
                    <Button title='Delete' color='red' onPress={props.onItemDeleted} />
                    <Button title='Close' onPress={props.onModalClosed} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        margin: 22
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

export default PlaceDetail;
