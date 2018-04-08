import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const ListItem = (props) => (
    <View style={styles.listItem}>
        <Text>{props.placeName}</Text>
    </View>
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
