import React, { Component } from 'react';
import { 
	ActivityIndicator,
	Dimensions,
	ImageBackground,
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	StyleSheet, 
	View 
} from 'react-native';
import { connect } from 'react-redux';

import { tryAuth } from '../../store/actions/index';
import backgroundImage from '../../assets/background.jpg';
import validate from '../../utility/validation';

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
		viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
		authMode: 'login',
		controls: {
			email: {
				value: '',
				valid: false,
				validationRules: {
					isEmail: true
				},
				touched: false
			},
			password: {
				value: '',
				valid: false,
				validationRules: {
					minLength: 6
				},
				touched: false
			},
			confirmPassword: {
				value: '',
				valid: false,
				validationRules: {
					equalTo: 'password'
				},
				touched: false
			}
		}
	}
	
	componentWillUnmount() {
		Dimensions.removeEventListener('change', this.updateStyles);
	}

	authHandler = () => {
		const authData = {
			email: this.state.controls.email.value,
			password: this.state.controls.password.value
		};

		this.props.onTryAuth(authData, this.state.authMode);
	}

	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return {
				authMode: prevState.authMode === 'login' ? 'signup' : 'login'
			};
		});
	}

	updateInputState = (key, value) => {
		let connectedValue = {};

		if (this.state.controls[key].validationRules.equalTo) {
			const equalControl = this.state.controls[key].validationRules.equalTo;
			const equalValue = this.state.controls[equalControl].value;

			connectedValue = {
				...connectedValue,
				equalTo: equalValue
			};
		}
		if (key === 'password') {
			connectedValue = {
				...connectedValue,
				equalTo: value
			};
		}

		this.setState(prevState => {
			return {
				controls: {
					...prevState.controls,
					confirmPassword: {
						...prevState.controls.confirmPassword,
						valid: key === 'password' ? 
							validate(
								prevState.controls.confirmPassword.value, 
								prevState.controls.confirmPassword.validationRules, 
								connectedValue
							) : 
							prevState.controls.confirmPassword.valid
					},
					[key]: {
						...prevState.controls[key],
						value,
						valid: validate(value, prevState.controls[key].validationRules, connectedValue),
						touched: true
					}
				}
			};
		});
	}

	updateStyles = (dims) => {
		this.setState({
			viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
		});
	}
	
	render() {
		let headingText = null;
		let confirmPasswordControl = null;
		let submitButton = (
			<ButtonWithBackground 
				color='#29aaf4' 
				onPress={this.authHandler}
				disabled={
					!this.state.controls.email.valid ||
					!this.state.controls.password.valid ||
					(!this.state.controls.confirmPassword.valid && this.state.authMode === 'signup')
				}
			>
				Submit
			</ButtonWithBackground>
		);

		if (this.state.viewMode === 'portrait') {
			headingText = (
				<MainText>
					<HeadingText>Please Log In</HeadingText>
				</MainText>
			);
		}

		if (this.state.authMode === 'signup') {
			confirmPasswordControl = (
				<View 
					style={this.state.viewMode === 'portrait' ? 
						styles.passwordWrapperPortrait :
						styles.passwordWrapperLandscape}
				>
					<DefaultInput 
						style={styles.input} 
						placeholder='Confirm Password' 
						value={this.state.controls.confirmPassword.value}
						onChangeText={(val) => this.updateInputState('confirmPassword', val)}
						valid={this.state.controls.confirmPassword.valid}
						touched={this.state.controls.confirmPassword.touched}
						autoCapitalize='none'
						autoCorrect={false}
						secureTextEntry
					/>
				</View>
			);
		}
		if (this.props.isLoading) {
			submitButton = <ActivityIndicator />;
		}
		return (
			<ImageBackground 
				source={backgroundImage} 
				style={styles.backgroundImage}
			>
				<KeyboardAvoidingView style={styles.container} behavior='padding'>
					{headingText}      
					<ButtonWithBackground 
						color='#29aaf4'
						onPress={this.switchAuthModeHandler}
					>
						Switch to {this.state.authMode === 'login' ? 'Sign Up' : 'Login'}
					</ButtonWithBackground>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={styles.inputContainer}>
							<DefaultInput 
								style={styles.input} 
								placeholder='Your E-Mail Address' 
								value={this.state.controls.email.value}
								onChangeText={(val) => this.updateInputState('email', val)}
								valid={this.state.controls.email.valid}
								touched={this.state.controls.email.touched}
								autoCapitalize='none'
								autoCorrect={false}
								keyboardType='email-address'

							/>
							<View 
								style={this.state.viewMode === 'portrait' || this.state.authMode === 'login' ? 
									styles.passwordContainerPortrait : 
									styles.passwordContainerLandscape}
							>
								<View 
									style={this.state.viewMode === 'portrait' || this.state.authMode === 'login' ?
										styles.passwordWrapperPortrait :
										styles.passwordWrapperLandscape}
								>
									<DefaultInput 
										style={styles.input} 
										placeholder='Password'
										value={this.state.controls.password.value}
										onChangeText={(val) => this.updateInputState('password', val)}
										valid={this.state.controls.password.valid}
										touched={this.state.controls.password.touched}
										autoCapitalize='none'
										autoCorrect={false}
										secureTextEntry
									/>
								</View>
								{confirmPasswordControl}
							</View>
						</View>
					</TouchableWithoutFeedback>
					{submitButton}
				</KeyboardAvoidingView>
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

const mapStateToProps = state => {
	return {
		isLoading: state.ui.isLoading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
