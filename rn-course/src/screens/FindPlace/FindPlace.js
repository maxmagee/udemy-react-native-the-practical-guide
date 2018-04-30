import React, { Component } from 'react';
import {
    Animated,
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native';
import { connect } from 'react-redux';

import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: 'orange'
    }
    
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    state = {
        placesLoaded: false,
        buttonAnimation: new Animated.Value(1),
        listAnimation: new Animated.Value(0)
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
    
    itemSelectedHandler = key => {
        const selectedPlace = this.props.places.find(place => {
            return place.key === key;
        });

        this.props.navigator.push({
            screen: 'awesome-places.PlaceDetailScreen',
            title: selectedPlace.name,
            passProps: {
                selectedPlace
            }
        });
    };

    placesLoadedHandler = () => {
        Animated.timing(this.state.listAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }

    placesSearchHandler = () => {
        Animated.timing(this.state.buttonAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                placesLoaded: true
            });
            this.placesLoadedHandler();
        });
    }

    render() {
        let content = (
            <Animated.View
                style={{
                    opacity: this.state.buttonAnimation,
                    transform: [
                        {
                            scale: this.state.buttonAnimation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [12, 1]
                            })
                        }
                    ]
                }}
            >
                <TouchableOpacity onPress={this.placesSearchHandler}>
                    <View style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Find Places</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );

        if (this.state.placesLoaded) {
            content = (
                <Animated.View
                    style={{
                        opacity: this.state.listAnimation
                    }}
                >
                    <PlaceList 
                        places={this.props.places} 
                        onItemSelected={this.itemSelectedHandler}
                    />
                </Animated.View>
            );
        }

        return (
            <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchButton: {
        borderColor: 'orange',
        borderRadius: 50,
        borderWidth: 3,
        padding: 20
    },
    searchButtonText: {
        color: 'orange',
        fontSize: 26,
        fontWeight: 'bold'
    }
});

const mapStateToProps = state => {
    return {
        places: state.places.places
    };
};

export default connect(mapStateToProps)(FindPlaceScreen);
