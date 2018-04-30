import React, { Component } from 'react';
import { 
    Dimensions,
    ImageBackground, 
    StyleSheet, 
    View 
} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';

import backgroundImage from '../../assets/background.jpg';

import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';

class AuthScreen extends Component {
    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateStyles);
    }

    state = {
        viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
    }
    
    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyles);
    }

    loginHandler = () => {
        startMainTabs();
    }

    updateStyles = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
        });
    }
    
    render() {
        let headingText = null;

        if (this.state.viewMode === 'portrait') {
            headingText = (
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
            );
        }
        return (
            <ImageBackground 
                source={backgroundImage} 
                style={styles.backgroundImage}
            >
                <View style={styles.container}>
                    {headingText}      
                    <ButtonWithBackground color='#29aaf4'>Switch to Login</ButtonWithBackground>
                    <View style={styles.inputContainer}>
                        <DefaultInput style={styles.input} placeholder='Your E-Mail Address' />
                        <View 
                            style={this.state.viewMode === 'portrait' ? 
                                styles.passwordContainerPortrait : 
                                styles.passwordContainerLandscape}
                        >
                            <View 
                                style={this.state.viewMode === 'portrait' ?
                                    styles.passwordWrapperPortrait :
                                    styles.passwordWrapperLandscape}
                            >
                                <DefaultInput style={styles.input} placeholder='Password' />
                            </View>
                            <View 
                                style={this.state.viewMode === 'portrait' ?
                                    styles.passwordWrapperPortrait :
                                    styles.passwordWrapperLandscape}
                            >
                                <DefaultInput style={styles.input} placeholder='Confirm Password' />
                            </View>
                        </View>
                    </View>
                    <ButtonWithBackground 
                        color='#29aaf4' 
                        onPress={this.loginHandler}
                    >
                        Submit
                    </ButtonWithBackground>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%'
    },
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb'
    },
    inputContainer: {
        width: '80%'
    },
    passwordContainerLandscape: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    passwordContainerPortrait: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    passwordWrapperLandscape: {
        width: '45%'
    },
    passwordWrapperPortrait: {
        width: '100%'
    }
});

export default AuthScreen;
