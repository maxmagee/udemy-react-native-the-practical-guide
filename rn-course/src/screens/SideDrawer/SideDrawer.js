import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class SideDrawerScreen extends Component {
    render() {
        return (
            <View
                style={[
                    styles.container,
                    { width: Dimensions.get('window').width * 0.8 }
                ]}
            >
                <TouchableOpacity>
                    <View style={styles.drawerItem}>
                        <Icon 
                            name='ios-log-out' 
                            style={styles.drawerIconItem} 
                            size={30} 
                            color='#aaa' 
                        />
                        <Text>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 50
    },
    drawerItem: {
        alignItems: 'center',
        backgroundColor: '#eee',
        flexDirection: 'row',
        padding: 10
    },
    drawerIconItem: {
        marginRight: 10
    }
});

export default SideDrawerScreen;
