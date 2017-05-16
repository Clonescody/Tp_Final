import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Dimensions,
	ListView,
    Text,
    Image,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    BackHandler
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {StackNavigator} from 'react-navigation';
import {TabNavigator} from 'react-navigation';
import {NavigationActions} from 'react-navigation';
import Camera from 'react-native-camera';
import Swiper from 'react-native-swiper';
import {Form, Separator, InputField, LinkField, 
		SwitchField, PickerField, DatePickerField, 
		TimePickerField } 
from 'react-native-form-generator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class MainView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tapped: false,
            camera: false,
            swipe: false,
			news: false
        }
    }

    static navigationOptions = {
        title: 'Première vue',
		header: null
    };

    render() {
        console.log("tapped:" + this.state.tapped);
        console.log("camera:" + this.state.camera);
        console.log("swipe:" + this.state.swipe);
        console.log("news:" + this.state.news);
        return (
            <View style={styles.container}>
				<Header title="Accueil"/>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => this.setState({tapped: !this.state.tapped, camera: !this.state.camera })}
                                      style={styles.animatedLarge}>
                        <Animatable.View
                            style={styles.buttonLarge}
                            animation={this.state.tapped ? 'zoomOut' : 'slideInUp'}
                            onAnimationEnd={this.state.camera ? () => {this.props.navigation.navigate('Camera');} : () => {} }>
                            <TouchableOpacity onPress={() => this.setState({camera: !this.state.camera})}>
                                <Image style={styles.imageLarge} source={require('./assets/images/camera-logo.png')}/>
                            </TouchableOpacity>
                        </Animatable.View>
                    </TouchableOpacity>
				</View>
																		 
				<View style={styles.row}>
					<TouchableOpacity onPress={() => this.setState({tapped: !this.state.tapped, news: !this.state.news })}
                                      style={styles.animatedLarge>
                        <Animatable.View
                            style={styles.buttonLarge}
                            animation={this.state.tapped ? 'zoomOut' : 'slideInUp'}
                            onAnimationEnd={this.state.news ? () => {this.props.navigation.navigate('NewsList');} : () => {} }>
                            <TouchableOpacity onPress={() => this.setState({news: !this.state.news})}>
                                <Text>Actualités</Text>
                            </TouchableOpacity>
                        </Animatable.View> 
                    </TouchableOpacity>
                </View>
                


                <View style={styles.row}>
                    <TouchableOpacity onPress={() => this.setState({tapped: !this.state.tapped, swipe: !this.state.swipe })}
                                      style={styles.animated}>
                        <Animatable.View
                            style={styles.button}
                            animation={this.state.tapped ? 'zoomOut' : 'slideInRight'}
                            onAnimationEnd={this.state.swipe ? () => {this.props.navigation.navigate('Swipe');} : () => {} }>
                            <TouchableOpacity onPress={() => this.setState({swipe: !this.state.swipe})}>
                                <Text>Swipe</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.setState({tapped: !this.state.fontSize })}
                                      style={[styles.animated, {marginRight: 10}]}>
                        <Animatable.View
                            style={styles.button}
                            animation={this.state.tapped ? 'zoomOut' : 'slideInDown'}
                            onAnimationEnd={this.state.tapped ? () => {} : () => {} }>
                            <TouchableOpacity onPress={() => this.setState({tapped: !this.state.tapped})}>
                                <Text>Boutton vide</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    </TouchableOpacity>
					<TouchableOpacity onPress={() => this.setState({tapped: !this.state.fontSize })}
                                      style={styles.animated}>
                        <Animatable.View
                            style={styles.button}
                            animation={this.state.tapped ? 'zoomOut' : 'slideInDown'}
                            onAnimationEnd={this.state.tapped ? () => {} : () => {} }>
                            <TouchableOpacity onPress={() => this.setState({tapped: !this.state.tapped})}>
                                <Text>Boutton vide</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cecece'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 10
    },
    animated: {
        width: (Dimensions.get('window').width-40)/2,
        height: 120
    },
    button: {
        width: (Dimensions.get('window').width-40)/2,
        height: 120,
        borderWidth: 1,
        borderColor: '#000000'
    },
	image: {
		width: (Dimensions.get('window').width-40)/2,
		height: 120
	},
	animatedLarge: {
		width: (Dimensions.get('window').width-20),
        height: 120
	},
	buttonLarge: {
		width: (Dimensions.get('window').width-20),
        height: 120,
        borderWidth: 1,
        borderColor: '#000000'
	},
	imageLarge: {
		width: (Dimensions.get('window').width-20),
		height: 120
	}
});

class NewsListView extends Component {
	
	static navigationOptions = {
        title: 'Liste d\'actus',
		header: null
    };
	
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows([
				'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
			])
		};
	}
	
	render(){
		return(
			<View style={newsListStyle.container}>
			<Header title="Actualités"/>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={(rowData) => 
								<View style={newsListStyle.item}><Text>{rowData}</Text></View>
								
							}
				/>
			</View>
		);
	}
}

const newsListStyle = StyleSheet.create({
	container: {
		flex: 1,
	},
	item: {
		backgroundColor: '#9cadb5',
		height: 60,
		marginTop: 5
	}
});

class Header extends Component {
	constructor(props){
		super(props);
	}
	
	render(){
		return(
			<View style={headerStyles.logoContainer}>
				<Image style={headerStyles.logoImage} source={require('./assets/images/camera-logo.png')}/>
				<Text style={headerStyles.logoTitle}>{this.props.title}</Text>
			</View>
		);
	}
}

const headerStyles = StyleSheet.create({
	logoContainer: {
		flex: 1,
		height: 70,
		maxHeight: 70,
		flexDirection: 'row',
		padding: 10,
		backgroundColor: '#f06a0f'
	},
	logoImage: {
		width: 50,
		height: 50
	},
	logoTitle: {
		fontSize: 20,
		marginTop: 10,
		marginLeft: 10,
		color: '#FFFFFF'
	},
});

class CustomForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			formData: '',
			response: '',
			message: '',
			style: ''
		}
	}
	
	handleFormChange(formData){
		this.setState({formData:formData})
		console.log(this.state.formData);
	}
	
	handleFormFocus(event, reactNode){
   		//this.refs.scroll.scrollToFocusedInput(event, reactNode);
	}
	
	_sendInfos() {
		console.log('nom : '+this.state.formData.first_name);
		console.log('prenom : '+this.state.formData.last_name);
		
		if(this._validateName(this.state.formData.first_name)){
			this.setState({response: true,
						  message: 'Réussi',
						  style: 'success'});
		}else{
			this.setState({response: false,
						  message: 'Raté',
						  style: 'fail'});
		}
	}
	
	_validateName(value){
		if(value == '') return "Required";
		if(!value) return true;
		var matches = value.match(/\d+/g);
		if (matches != null) {
			return false;
		}
		return true;
	}
	
	render(){
		
		console.log('response : '+this.state.response);	
		console.log('style : '+ this.state.style);
		return(
			<KeyboardAwareScrollView ref='scroll'>
				<Text style={{fontSize: 20}}>Formulaire</Text>
				<View style={[formStyle.messageContainer, formStyle[this.state.style]]}>
               		<Text>{this.state.message}</Text>
                </View>
			
			
			
				<View ></View>
    			<Form ref='testForm'
					onFocus={this.handleFormFocus.bind(this)}
					onChange={this.handleFormChange.bind(this)}
					label="Personal Information">
					<InputField 
					 	ref='first_name' 
					 	placeholder='First Name'
						style={formStyle.input}/>
					
					<InputField 
					 	ref='last_name' 
					 	placeholder='Last Name'
						style={formStyle.input}/>
				</Form>
				<TouchableOpacity onPress={this._sendInfos.bind(this)}
                                      style={[styles.animated, {marginRight: 10}]}>
						<Text>Envoyer</Text>
				</TouchableOpacity>
			</KeyboardAwareScrollView>
			
		);
	}
}

const formStyle = StyleSheet.create({
	messageContainer: {
		flex: 1,
		height: 30
	},
	success:{
		backgroundColor: '#095115'
	},
	fail: {
		backgroundColor: '#8b0000'
	},
	invisible: {
		height: 0,
		width: 0
	},
	form: {
		flex: 1
	},
	input: {
		flex: 1
	}
});

class SwipeView extends Component {
    constructor(props){
        super(props);
        this.handleBack = (() => {
            console.log('handleBack');
            this.props.navigation.navigate('Main');
            return true;
        });
    }
    
    static navigationOptions = {
        title: 'Swipe vue',
		header: null
    };
    
    
    componentDidMount() {
        console.log('compMounted');
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }
    
    render(){
        return(
			<View style={swiperStyles.container}>
				<Header/>
				<Swiper style={swiperStyles.swiper} showsButtons={false}>
					<View style={swiperStyles.view}>
						<CustomForm/>
					</View>
					<View>
					  	<Text style={styles.text}>Beautiful</Text>
					</View>
					<View>
					  	<Text style={styles.text}>And simple</Text>
					</View>
				</Swiper>
			</View>
        );
    }
}

const swiperStyles = StyleSheet.create({
	container: {
		flex: 1
	},
	swiper: {
		flex: 1,
	},
	view: {
		flex: 1
	}
});

class CameraView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            position: '0'
        }
    }
    
    static navigationOptions = {
        header: null
    };

    takePicture() {
        const options = {};
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("test");
                this.setState({position});
            },
            (error) => {
                console.log(JSON.stringify(error));
                this.props.navigation.navigate('Main');
            },
            {enableHighAccuracy: true, timeout: 50000}
        );
        if(this.state.position)
            options.location = this.state.position;
        
        console.log('pos0 :' + options.location);
        this.camera.capture({metadata: options})
            .then((data) => console.log(data))
            .catch(err => console.error(err));

        console.log('pos1 :' + options.location);
        console.log('pos2 :' + JSON.stringify(options.location));

    }

    render() {
        return (
          <View style={cameraStyle.container}>
            <Camera
              ref={(cam) => {
                this.camera = cam;
              }}
              style={cameraStyle.preview}
              aspect={Camera.constants.Aspect.fill}>
              <Text style={cameraStyle.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
            </Camera>
          </View>
        );
    }
}

const cameraStyle = StyleSheet.create({
    container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});




const App = StackNavigator({
		Main: {screen: MainView},
		Camera: {screen: CameraView},
		Swipe: {screen: SwipeView},
		NewsList: {screen: NewsListView}
    },
    {
		headerMode: 'screen'
	}
);

AppRegistry.registerComponent('Tp_AppFinale4_4_2', () => App);