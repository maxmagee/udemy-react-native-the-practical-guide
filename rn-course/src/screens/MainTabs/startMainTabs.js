import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { getImageSource } from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
        getImageSource(Platform.OS === 'android' ? 'md-share-alt' : 'ios-share', 30),
        getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30)
    ])
    .then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: 'awesome-places.FindPlaceScreen',
                    label: 'Find Place',
                    title: 'Find Place',
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                id: 'sideDrawerToggle',
                                icon: sources[2],
                                title: 'Menu'
                            }
                        ]
                    }
                },
                {
                    screen: 'awesome-places.SharePlaceScreen',
                    label: 'Share Place',
                    title: 'Share Place',
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                id: 'sideDrawerToggle',
                                icon: sources[2],
                                title: 'Menu'
                            }
                        ]
                    }
                }
            ],
            drawer: {
                left: {
                    screen: 'awesome-places.SideDrawerScreen'
                }
            }
        });
    });    
};

export default startTabs;
