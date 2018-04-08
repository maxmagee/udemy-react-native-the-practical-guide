import React from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

export default class App extends React.Component {
  state = {
    placeName: ''
  }

  placeNameChangedHandler = (val) => {
    this.setState({
      placeName: val
    });
  }
  
  render() {
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
          style={styles.placeButton}
          title='Add'
        />
      </View>
        
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
  placeInput: {
    width: '70%'
  },
  placeButton: {
    width: '30%'
  }
});
