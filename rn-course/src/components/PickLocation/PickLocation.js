import React, { Component } from 'react';
import { Button, Dimensions, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

class PickLocation extends Component {
    state = {
        focusedLocation: {
            latitude: 37.7900352,
            longitude: -122.4013726,
            latitudeDelta: 0.0122,
            longitudeDelta: 
                (Dimensions.get('window').width / Dimensions.get('window').height) * 0.0122
        },
        locationChosen: false
    }

    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            };
            this.pickLocationHandler(coordsEvent);
        },
        err => {
            console.log(err);
            alert('Fetching the position failed, please pick the position manually.');
        });
    }

    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        });

        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
            };
        });

        this.props.onLocationPick({
            latitude: coords.latitude,
            longitude: coords.longitude
        });
    }

    render() {
        let marker = null;

        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
        }
        return (
            <View style={styles.container}>
                <MapView 
                    initialRegion={this.state.focusedLocation}
                    style={styles.map}
                    onPress={this.pickLocationHandler}
                    ref={ref => { this.map = ref; }}
                >
                    {marker}
                </MapView>
                <View style={styles.button}>
                    <Button title='Locate Me' onPress={this.getLocationHandler} />
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
    map: {
        height: 250,
        width: '100%' 
    },
    previewImage: {
        height: '100%',
        width: '100%'
    }
});

export default PickLocation;
