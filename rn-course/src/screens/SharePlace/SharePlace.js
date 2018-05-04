import React, { Component } from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
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

    placeAddedHandler = () => {
        if (this.state.controls.placeName.value.trim() !== '') {
            this.props.onAddPlace(this.state.controls.placeName.value.trim());
        }
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
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Share a Place with us!</HeadingText>
                    </MainText>
                    <PickImage />
                    <PickLocation />
                    <PlaceInput 
                        placeData={this.state.controls.placeName} 
                        onChangeText={this.placeNameChangedHandler} 
                    />
                    <View style={styles.button}>
                        <Button 
                            title='Share the Place' 
                            onPress={this.placeAddedHandler} 
                            disabled={!this.state.controls.placeName.valid}
                        />
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

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
    };
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
