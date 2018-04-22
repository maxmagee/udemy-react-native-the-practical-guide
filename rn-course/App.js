import React from 'react';
import { StyleSheet, View } from 'react-native';
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import placeImage from './src/assets/st-lucia.jpg';

export default class App extends React.Component {
  state = {
    places: []
  }

  placeNameChangedHandler = (val) => {
    this.setState({
      placeName: val
    });
  }

  placeAddedHandler = (placeName) => {
    this.setState(prevState => {
      return {
        places: prevState.places.concat({ 
          key: Math.random(),     // assume this is unique just for this example
          name: placeName,
          image: placeImage
        })
      };
    });
  }
  
  placeDeletedHandler = key => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter((place) => place.key !== key)
      };
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceInput
          onPlaceAdded={this.placeAddedHandler}
        />
        <PlaceList 
          places={this.state.places} 
          onItemDeleted={this.placeDeletedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }  
});
