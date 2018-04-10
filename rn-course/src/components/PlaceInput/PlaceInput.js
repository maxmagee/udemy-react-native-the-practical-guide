import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

class PlaceInput extends Component {
	state = {
		placeName: ''
	}

	placeNameChangedHandler = (val) => {
		this.setState({
			placeName: val
		});
	}

	placeSubmitHandler = () => {
		if (this.state.placeName.trim() === '') { return; }

		this.props.onPlaceAdded(this.state.placeName);
	}

	render() {
		return (
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
		);
	}
}

const styles = StyleSheet.create({
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

export default PlaceInput;
