import React from 'react';
import { StyleSheet, View } from 'react-native';
import ListItem from '../ListItem/ListItem';

const List = (props) => {
    const listItems = props.places.map((place, i) => (
        <ListItem placeName={place} key={i} />
    ));

    return (
        <View style={styles.listContainer}>
            {listItems}
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        width: '100%'
    }
});

export default List;
