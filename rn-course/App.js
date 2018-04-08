import React from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import ListItem from './src/components/ListItem/ListItem';

export default class App extends React.Component {
  state = {
    placeName: '',
    places: []
  }

  placeNameChangedHandler = (val) => {
    this.setState({
      placeName: val
    });
  }

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === '') { return; }

    this.setState(prevState => {
      return {
        places: prevState.places.concat(this.state.placeName)
      };
    });
  }
  
  render() {
    const placesOutput = this.state.places.map((place, i) => (
      <ListItem key={i} placeName={place} />
    ));

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput 
            onChangeText={this.placeNameChangedHandler}
            placeholder='An Awesome Place'
            style={styles.placeInput}
            value={this.state.placeName} 
          />
          <Button 
            onPress={this.placeSubmitHandler}
            style={styles.placeButton}
            title='Add'
          />
        </View>
        <View style={styles.listContainer}>{placesOutput}</View>
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
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  listContainer: {
    width: '100%'
  },
  placeInput: {
    width: '70%'
  },
  placeButton: {
    width: '30%'
  }
});
