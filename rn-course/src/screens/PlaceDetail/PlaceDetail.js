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
                <View style={styles.subContainer}>
                    <Image 
                        source={this.props.selectedPlace.image}
                        style={styles.placeImage} 
                    />
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
    placeImage: {
        height: 200,
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
