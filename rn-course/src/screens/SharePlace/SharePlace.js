import React, { Component } from 'react';
import { Button, Image, ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions/index';
import imagePlaceholder from '../../assets/background.jpg';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';

class SharePlaceScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
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

    placeAddedHandler = placeName => {
        this.props.onAddPlace(placeName);
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                
                    <MainText>
                        <HeadingText>Share a Place with us!</HeadingText>
                    </MainText>
                    <View style={styles.placeholder}>
                        <Image source={imagePlaceholder} style={styles.previewImage} />
                    </View>
                    <View style={styles.button}>
                        <Button title='Pick Image' />
                    </View>
                    
                    <View style={styles.placeholder}>
                        <MainText>Map</MainText>
                    </View>
                    <View style={styles.button}>
                        <Button title='Locate Me' />
                    </View>
                    <DefaultInput placeholder='Place Name' />
                    <View style={styles.button}>
                        <Button title='Share the Place' />
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
