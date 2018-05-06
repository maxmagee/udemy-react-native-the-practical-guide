import React, { Component } from 'react';
import { 
    Dimensions,
    Image, 
    Platform, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';

import { deletePlace } from '../../store/actions/index';

class PlaceDetailScreen extends Component {
    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateStyles);
    }

    state = {
        viewMode: 'portrait'
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyles);
    }

    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop();
    }

    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
        });
    }

    render() {
        return (
            <View 
                style={[
                    styles.container, 
                    this.state.viewMode === 'portrait' ? 
                        styles.containerPortrait : 
                        styles.containerLandscape
                    ]}    
            >
                <View style={styles.placeDetailContainer}>
                    <View style={styles.subContainer}>
                        <Image 
                            source={this.props.selectedPlace.image}
                            style={styles.placeImage} 
                        />
                    </View>
                    <View style={styles.subContainer}>
                    <MapView
                        initialRegion={{
                            ...this.props.selectedPlace.location,
                            latitudeDelta: 0.0122,
                            longitudeDelta: 
                                (Dimensions.get('window').width / Dimensions.get('window').height) * 0.0122 //eslint-disable-line max-len
                        }}
                        style={styles.map}
                    >
                        <MapView.Marker coordinate={this.props.selectedPlace.location} />
                    </MapView>
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.placeDeletedHandler}>
                            <View style={styles.deleteButton}>
                                <Icon 
                                    size={30} 
                                    name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} 
                                    color='red' 
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 22
    },
    containerPortrait: {
        flexDirection: 'column'
    },
    containerLandscape: {
        flexDirection: 'row'
    },
    deleteButton: {
        alignItems: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    placeDetailContainer: {
        flex: 2
    },
    placeImage: {
        height: '100%',
        width: '100%'
    },
    placeName: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subContainer: {
        flex: 1
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
    };
};

export default connect(null, mapDispatchToProps)(PlaceDetailScreen);
