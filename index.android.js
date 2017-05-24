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
import AppLoader from './classes/AppLoader.js';

const appLoader = new AppLoader();
appLoader.init();

class MainView extends Component {

    constructor(props) {
        super(props);
		
        this.state = {
            tapped: false,
            report: false,
            swipe: false,
			news: false,
			fetcher: false
        };
    }

    static navigationOptions = {
        title: 'Première vue',
		header: null
    };

    render() {
		return (
            <View style={styles.container}>
				<Header title="Accueil" backArrow="false" navigation={this.props.navigation}/>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => this.setState({tapped: !this.state.tapped, news: !this.state.news })}
                                      style={styles.animatedLarge}>
                        <Animatable.View
                            style={styles.buttonLarge}
                            animation={this.state.tapped ? 'zoomOut' : 'slideInUp'}
                            onAnimationEnd={this.state.news ? () => {
																			this.setState({tapped: false, news: false});	
																			this.props.navigation.navigate('NewsList');
										   								} : () => {} }>
							<Swiper style={styles.animated} 
									showsButtons={false}
									loop={true}
									autoplay={true}
									autoplayTimeout={4}>
								<View>
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
					<TouchableOpacity onPress={() => this.setState({tapped: !this.state.tapped, report: !this.state.report })}
                                      style={styles.animatedLarge}>
                        <Animatable.View
                            style={styles.buttonLarge}
                            animation={this.state.tapped ? 'zoomOut' : 'slideInUp'}
                            onAnimationEnd={this.state.report ? () => {
																		this.setState({tapped: false, report: false});				
																		this.props.navigation.navigate('Report');
																	} : () => {} }>
                            
                                <Image style={styles.imageLarge} source={require('./assets/images/camera-logo.png')}/>
                        </Animatable.View>
                    </TouchableOpacity>
                </View>
																		 
			 	<View style={styles.row}>
					<TouchableOpacity onPress={() => this.setState({tapped: !this.state.tapped, file: !this.state.file })}
                                      style={styles.animatedLarge}>
                        <Animatable.View
                            style={styles.buttonLarge}
                            animation={this.state.tapped ? 'zoomOut' : 'slideInUp'}
                            onAnimationEnd={this.state.file ? () => {
																		this.setState({tapped: false, file: false});				
																		this.props.navigation.navigate('Download');
																	} : () => {} }>
                            
                                <Text>Dowload image test</Text>
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

class DownloadFileView extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			downloaded: false,
			RNFS: require('react-native-fs')
		}
	}
	
	 static navigationOptions = {
        title: 'Download view',
		header: null
    };
	
	_downloadFile(){		
		var url = 'http://centaure-systems.fr/images/logo_centaure_systems.png';
	  	var path = `${this.state.RNFS.DocumentDirectoryPath}/test.png`;
		var localPath = '/storage/emulated/0/Download';
		console.log('AAAA');
	  	this.state.RNFS.downloadFile({fromUrl:url, toFile: path}).promise.then(res => {
			this.setState({downloaded: true});
		  	console.log('downloaded', res);
		});
	}
	
	render(){
		
		if(!this.state.downloaded)
	  		this._downloadFile();
	  	const image = this.state.downloaded ? (<View>
		<Image style={{width: 300,height: 83}} 
			   source={{uri: `file://${this.state.RNFS.DocumentDirectoryPath}/test.png`
						,scale: 1}}
		  />
		</View>
		) : null;
		
		return(
			<View>
			<Header title="Download" navigation={this.props.navigation}/>
				{image}
			</View>
		);
	}
}
class FetchingView extends Component {
	constructor(props){
		super(props);
	}
	
	static navigationOptions = {
        title: 'Fetching vue',
		header: null
    };
	
	render(){
		let datas = require('./assets/json/app.json');
		return(
			<View>
				<Header title="Web view" navigation={this.props.navigation} />
				<WebView
					source={{uri: datas.tiles[0].url}}
					style={{flex: 1, marginTop: 10}}
				/>
			</View>
			
		);
	}
}

class NewsListView extends Component {
	
	constructor(props){
		super(props);
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
					renderHeader={() => 
									<Header title="Actualités" navigation={this.props.navigation}/>
								 }
					renderRow={(rowData) => this._renderRow(rowData)}/>
			</View>
		);
	}
}

class NewsRow extends Component {
	constructor(props){
		super(props);
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
	}
	
	static navigationOptions = {
        title: 'News vue',
		header: null
    };
	
	render(){
		return(
			<View>
			<Header title={this.state.title} navigation={this.props.navigation}/>

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
		this.state = {
			backArrow: true
		};
		this.props.backArrow ? this.state.backArrow = this.props.backArrow : this.state.backArrow = true;
		this.handleBack = (() => {
			if(this.props.title === 'Accueil'){
				BackHandler.exitApp();
			}
			else{
				this.props.navigation.goBack(null);
			}
        });	
		BackHandler.addEventListener('hardwareBackPress', this.handleBack);
	}
	
	render(){
		var backArrow = null;
		if(this.props.title !== 'Accueil'){
			backArrow = <TouchableOpacity onPress={this.handleBack}>
									  <Image
										style={headerStyles.logoImage}
										source={require('./assets/images/back-arrow.png')}
									  />
							  </TouchableOpacity>
		}
			
		return(
			<View style={headerStyles.logoContainer}>
				{backArrow}
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
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 5,
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
			style: '',
			position: '0',
		};
	}
	
	handleFormChange(formData){
		this.setState({formData:formData})
	}
	
	handleFormFocus(event, reactNode){
   		//this.refs.scroll.scrollToFocusedInput(event, reactNode);
	}
	
	setPositionFromChildren(position){
		this.setState({position: position});
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
	
	_takePicture(){
		this.props.navigation.navigate('Camera', {setPositionFromChildren: this.setPositionFromChildren.bind(this)});
	}
	
	render(){
		console.log('state : ', this.state);
		return(
			<View>
				<Header title='Envoyer un rapport' navigation={this.props.navigation} />
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
						<TouchableOpacity onPress={this._takePicture.bind(this)}
										  style={[styles.animated, {marginRight: 10}]}>
							<Text>Prendre photo</Text>
						</TouchableOpacity>
					</Form>
					<TouchableOpacity onPress={this._sendInfos.bind(this)}
										  style={[styles.animated, {marginRight: 10}]}>
							<Text>Envoyer</Text>
					</TouchableOpacity>
				</KeyboardAwareScrollView>
			</View>
			
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
    }
    
    static navigationOptions = {
        title: 'Swipe vue',
		header: null
    };
    
    render(){
        return(
			<View style={swiperStyles.container}>
				<Header title="Swiper" navigation={this.props.navigation}/>
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

class ReportView extends Component {
	constructor(props){
		super(props);
	}
	
	static navigationOptions = {
        title: 'Swipe vue',
		header: null
    };
	
	render(){
		return(
			<View>
				<CustomForm navigation={this.props.navigation}/>
			</View>
		);
	}
}

class CameraView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            position: '0'
        };
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
                this.props.navigation.goBack();
            },
            {enableHighAccuracy: true, timeout: 50000}
        );
        if(this.state.position)
            options.location = this.state.position;
        
		console.log('pos :', this.state.position);
        console.log('pos0 :' + options.location);
        this.camera.capture({metadata: options})
            .then((data) => console.log(data))
            .catch(err => console.error(err));

        console.log('pos1 :' + options.location);
        console.log('pos2 :' + JSON.stringify(options.location));
		
		this.props.navigation.state.params.setPositionFromChildren(this.state.position);
  		this.props.navigation.goBack();

    }

    render() {
        return (
          <View style={cameraStyle.container}>
			<Header title="Prendre une photo" navigation={this.props.navigation} />
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
    flexDirection: 'column',
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
		Fetcher: {screen: FetchingView},
		Download: {screen: DownloadFileView},
		Report: {screen: ReportView}
    },
    {
		headerMode: 'screen'
	}
);

AppRegistry.registerComponent('Tp_AppFinale4_4_2', () => App);