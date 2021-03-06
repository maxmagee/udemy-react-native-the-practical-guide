import React, { Component } from 'react';
import { 
    ActivityIndicator, 
    Button, 
    ScrollView, 
    StyleSheet,
    View 
} from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions/index';
import validate from '../../utility/validation';

import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import PlaceInput from '../../components/PlaceInput/PlaceInput';

class SharePlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: 'orange'
    }
    
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    state = {
        controls: {
            placeName: {
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            location: {
                value: null,
                valid: false
            },
            image: {
                value: null,
                valid: false
            }
        }
    }

    onNavigatorEvent = event => {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'sideDrawerToggle') {
                this.props.navigator.toggleDrawer({
                    side: 'left'
                });
            }
        }
    }

    imagePickedHandler = image => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                } 
            };
        });
    }

    locationPickedHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            };
        });
    }

    placeAddedHandler = () => {
        this.props.onAddPlace(
            this.state.controls.placeName.value.trim(), 
            this.state.controls.location.value,
            this.state.controls.image.value
        );
    };

    placeNameChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val,
                        valid: validate(val, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            };
        });
    }

    render() {
        let submitButton = 
            (<Button 
                title='Share the Place' 
                onPress={this.placeAddedHandler} 
                disabled={
                    !this.state.controls.placeName.valid ||
                    !this.state.controls.location.valid ||
                    !this.state.controls.image.valid
                }
            />);
        

        if (this.props.isLoading) {
            submitButton = <ActivityIndicator />;
        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Share a Place with us!</HeadingText>
                    </MainText>
                    <PickImage onImagePicked={this.imagePickedHandler} />
                    <PickLocation onLocationPick={this.locationPickedHandler} />
                    <PlaceInput 
                        placeData={this.state.controls.placeName} 
                        onChangeText={this.placeNameChangedHandler} 
                    />
                    <View style={styles.button}>
                        {submitButton}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        margin: 8
    },
    container: {
        alignItems: 'center',
        flex: 1,
    },
    placeholder: {
        backgroundColor: '#eee',
        borderColor: 'black',
        borderWidth: 1,
        height: 150,
        width: '80%'
    },
    previewImage: {
        height: '100%',
        width: '100%'
    }
});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);
