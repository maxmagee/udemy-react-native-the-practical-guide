import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ListItem = (props) => (
	<TouchableOpacity onPress={props.onItemPressed}>
		<View style={styles.listItem}>
			<Image 
				style={styles.placeImage} 
				source={props.placeImage} 
			/>
			<Text>{props.placeName}</Text>
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	listItem: {
		alignItems: 'center',
		backgroundColor: '#eee',
		flexDirection: 'row',
		marginBottom: 5,
		padding: 10,
		width: '100%'
	},
	placeImage: {
		height: 50,
		marginRight: 8,
		width: 50
	}
});

export default ListItem;
