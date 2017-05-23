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
    BackHandler,
	WebView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {StackNavigator} from 'react-navigation';
import {NavigationActions} from 'react-navigation';
import Camera from 'react-native-camera';
import Swiper from 'react-native-swiper';
import {Form, Separator, InputField, LinkField, 
		SwitchField, PickerField, DatePickerField, 
		TimePickerField } 
from 'react-native-form-generator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import './config/global.js';


class MainView extends Component {

    constructor(props) {
        super(props);
		
        this.state = {
            tapped: false,
            camera: false,
            swipe: false,
			news: false,
			fetcher: false
        };
		this.handleBack = (() => {
			BackHandler.exitApp();
            return true;
        });	
		BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    static navigationOptions = {
        title: 'Première vue',
		header: null
    };

    render() {
		/*var reader = new ReadingFileTest();
		reader._readFile();*/
		console.log('navigation main : '+this.props.navigation);
		return (
            <View style={styles.container}>
				<Header title="Accueil" navigation={this.props.navigation}/>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => this.setState({tapped: !this.state.tapped, news: !this.state.news })}
                                      style={styles.animatedLarge}>
                        <Animatable.View
                            style={styles.buttonLarge}
                            animation={this.state.tapped ? 'zoomOut' : 'slideInUp'}
                            onAnimationEnd={this.state.news ? () => {
																			
																			this.props.navigation.navigate('NewsList');
										   								} : () => {} }>
							<Swiper style={styles.animated} 
									showsButtons={false}
									loop={true}
									autoplay={true}
									autoplayTimeout={4}>
								<View>
										<Text>Actualités</Text>
									<Image style={styles.imageLarge} source={require('./assets/images/koala.jpg')}/>
								</View>
								<View>
									<Image style={styles.imageLarge} source={require('./assets/images/house.jpg')}/>
								</View>
								<View>
									<Image style={styles.imageLarge} source={require('./assets/images/fish.jpg')}/>
								</View>
							</Swiper>
                        </Animatable.View>
                    </TouchableOpacity>
				</View>
																			 
																			 
				<View style={styles.row}>
					<TouchableOpacity onPress={() => this.setState({tapped: !this.state.tapped, camera: !this.state.camera })}
                                      style={styles.animatedLarge}>
                        <Animatable.View
                            style={styles.buttonLarge}
                            animation={this.state.tapped ? 'zoomOut' : 'slideInUp'}
                            onAnimationEnd={this.state.camera ? () => {
																		this.setState({tapped: false, camera: false});				
																		this.props.navigation.navigate('Camera');
																	} : () => {} }>
                            
                                <Image style={styles.imageLarge} source={require('./assets/images/camera-logo.png')}/>
                        </Animatable.View>
                    </TouchableOpacity>
                </View>
                


                <View style={styles.row}>
                    <TouchableOpacity onPress={() => this.setState({tapped: !this.state.tapped, swipe: !this.state.swipe })}
                                      style={[styles.animated, {marginRight: 5}]}>
                        <Animatable.View
                            style={styles.button}
                            animation={this.state.tapped ? 'zoomOut' : 'slideInRight'}
							onAnimationEnd={this.state.swipe ? () => {
																		this.setState({tapped: false, swipe: false});	
																		this.props.navigation.navigate('Swipe');
																	} : () => {} }>
                            
                                <Text>Swipe</Text>
                        </Animatable.View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.setState({tapped: !this.state.tapped, fetcher: !this.state.fetcher })}
                                      style={[styles.animated, {marginLeft: 5}]}>
                        <Animatable.View
                            style={styles.button}
                            animation={this.state.tapped ? 'zoomOut' : 'slideInDown'}
                            onAnimationEnd={this.state.fetcher ? () => {
																		this.setState({tapped: false, fetcher: false});
																		this.props.navigation.navigate('Fetcher');
																	} : () => {} }>
                                
								<Text>Web player</Text>
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
        width: ((Dimensions.get('window').width)-31)/2,
        height: 120
    },
    button: {
        width: ((Dimensions.get('window').width)-31)/2,
        height: 120,
        borderWidth: 1,
        borderColor: '#000000'
    },
	image: {
		width: ((Dimensions.get('window').width)-31)/2,
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

/*TODO*/
class ReadingFileTest extends Component {
	
	constructor(props){
		super(props);
	}
	
	_readFile(){
		console.log("here");
		global.RNFS.readDir(global.RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
		  .then((result) => {
			console.log('GOT RESULT', result);

			// stat the first file
			return Promise.all([global.RNFS.stat(result[0].path), result[0].path]);
		  })
		  .then((statResult) => {
			if (statResult[0].isFile()) {
			  // if we have a file, read it
			  return global.RNFS.readFile(statResult[1], 'utf8');
			}

			return 'no file';
		  })
		  .then((contents) => {
			// log the file contents
			console.log(contents);
		  })
		  .catch((err) => {
			console.log(err.message, err.code);
		  });
	}
}

class FetchingView extends Component {
	constructor(props){
		super(props);
		this.handleBack = (() => {
            this.props.navigation.goBack(null);
            return true;
        });	
		BackHandler.addEventListener('hardwareBackPress', this.handleBack);
	}
	
	static navigationOptions = {
        title: 'Fetching vue',
		header: null
    };
	
	render(){
		let datas = require('./assets/json/app.json');
		console.log(datas);
		console.log(datas.tiles[0].url);
		return(
			<WebView
				source={{uri: datas.tiles[0].url}}
				style={{flex: 1, marginTop: 10}}
			/>
		);
	}
}

class NewsListView extends Component {
	
	constructor(props){
		super(props);
		this.handleBack = (() => {
            this.props.navigation.goBack(null);
            return true;
        });	
		BackHandler.addEventListener('hardwareBackPress', this.handleBack);
	}
	
	static navigationOptions = {
        title: 'Liste d\'actus',
		header: null
    };

	_renderRow(rowData){
		return <NewsRow title={rowData.title} content={rowData.content} navigation={this.props.navigation}/>
	}
	
	render(){
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		let actualites = ds.cloneWithRows(require('./assets/json/actualites.json'));
		
		return(
			<View style={newsListStyle.container}>
				<ListView
					contentContainerStyle={newsListStyle.list}
					dataSource={actualites}
					renderHeader={() => <Header title="Actualités"/>}
					renderRow={(rowData) => this._renderRow(rowData)}/>
			</View>
		);
	}
}

class NewsRow extends Component {
	constructor(props){
		super(props);
		
		this.handleBack = (() => {
            this.props.navigation.goBack(null);
            return true;
        });	
		BackHandler.addEventListener('hardwareBackPress', this.handleBack);
	}
	
	_showNews(){
		this.props.navigation.navigate('News', {title: this.props.title, content: this.props.content, image: this.props.image});
	}
	
	render(){
		return(
			<TouchableOpacity onPress={this._showNews.bind(this)} style={newsListStyle.item}>
				<Text>{this.props.title}</Text>
				<Text>{this.props.content}</Text>
			</TouchableOpacity>
		);
	}
}

const newsListStyle = StyleSheet.create({
	container: {
		flex: 1,
		height: Dimensions.get('window').height
	},
	list: {
		backgroundColor: 'transparent',
	},
	item: {
		flex: 1,
		backgroundColor: '#9cadb5',
		maxHeight: 100,
		marginTop: 5
	}
});

class NewsView extends Component {
	constructor(props){
		super(props);
		const {params} = this.props.navigation.state;
		this.state = {
			title: params.title,
			content: params.content,
			image: params.image
		};
		this.handleBack = (() => {
            this.props.navigation.goBack(null);
            return true;
        });	
		BackHandler.addEventListener('hardwareBackPress', this.handleBack);
	}
	
	static navigationOptions = {
        title: 'News vue',
		header: null
    };
	
	render(){
		return(
			<View>
			<Header title={this.state.title} />

				 <Image style= {{height:50, width:50}} source={{uri: 'koala'}}/>

				<Text>{this.state.title}</Text>
				<Text>{this.state.content}</Text>
			</View>
		);
	}
}

class Header extends Component {
	
	constructor(props){
		super(props);	
		this._onPressBack = (() => {
            this.props.navigation.goBack(null);
            return true;
        });	
	}
	
	render(){
		console.log('navigation header : '+this.props.navigation);
		return(
			<View style={headerStyles.logoContainer}>
				<TouchableOpacity onPress={this._onPressBack}>
				  <Image
					style={headerStyles.logoImage}
					source={require('./assets/images/back-arrow.png')}
				  />
				</TouchableOpacity>
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
		minHeight: 70,
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
		};
		this.handleBack = (() => {
            this.props.navigation.goBack(null);
            return true;
        });	
		BackHandler.addEventListener('hardwareBackPress', this.handleBack);
	}
	
	handleFormChange(formData){
		this.setState({formData:formData})
		console.log(this.state.formData);
	}
	
	handleFormFocus(event, reactNode){
   		//this.refs.scroll.scrollToFocusedInput(event, reactNode);
	}
	
	_sendInfos() {
		
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
            this.props.navigation.goBack(null);
            return true;
        });	
		BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }
    
    static navigationOptions = {
        title: 'Swipe vue',
		header: null
    };
    
    render(){
        return(
			<View style={swiperStyles.container}>
				<Header title="Swiper"/>
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
		marginTop: 70
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
        };
		this.handleBack = (() => {
            this.props.navigation.goBack(null);
            return true;
        });	
		BackHandler.addEventListener('hardwareBackPress', this.handleBack);
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
		NewsList: {screen: NewsListView},
		News: {screen: NewsView},
		Fetcher: {screen: FetchingView}
    },
    {
		headerMode: 'screen'
	}
);

AppRegistry.registerComponent('Tp_AppFinale4_4_2', () => App);