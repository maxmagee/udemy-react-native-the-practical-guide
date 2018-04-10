import React from 'react';
import { StyleSheet, View } from 'react-native';
import List from './src/components/List/List';
import ItemInput from './src/components/ItemInput/ItemInput';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.placeNameChangedHandler = this.placeNameChangedHandler.bind(this);
    this.placeSubmitHandler = this.placeSubmitHandler.bind(this);
  }

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
        places: prevState.places.concat(prevState.placeName)
      };
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ItemInput 
          placeNameChangedHandler={this.placeNameChangedHandler}
          placeSubmitHandler={this.placeSubmitHandler}
          value={this.state.placeName}
        />
        <List places={this.state.places} />
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
