import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

const ListItem = (props) => (
	<TouchableOpacity onPress={props.onItemPressed}>
		<View style={styles.listItem}>
			<Text>{props.placeName}</Text>
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	listItem: {
		backgroundColor: '#eee',
		marginBottom: 5,
		padding: 10,
		width: '100%'
	}
});

export default ListItem;
