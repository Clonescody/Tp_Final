import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    BackHandler
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {StackNavigator} from 'react-navigation';
import { NavigationActions } from 'react-navigation'
import Camera from 'react-native-camera';
import Swiper from 'react-native-swiper';


/*React.BackHandler.addEventListener('hardwareBackPress', function() {
        // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
        // Typically you would use the navigator here to go to the last state.
        console.log('backPress');
        return this.props.navigation.navigate('Main');
    });*/

class MainView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tapped: false,
            camera: false,
            swipe: false
        }
    }

    static navigationOptions = {
        title: 'Première vue'
    };

    render() {
        console.log("tapped:" + this.state.tapped);
        console.log("camera:" + this.state.camera);
        console.log("swipe:" + this.state.swipe);
        return (
            <View style={styles.container}>
                <View style={styles.row}>

                    <TouchableOpacity onPress={() => this.setState({tapped: !this.state.tapped, camera: !this.state.camera })}
                                      style={styles.animated}>
                        <Animatable.View
                            style={styles.button}
                            animation={this.state.tapped ? 'zoomOut' : 'slideInUp'}
                            onAnimationEnd={this.state.camera ? () => {this.props.navigation.navigate('Camera');} : () => {} }>
                            <TouchableOpacity onPress={() => this.setState({camera: !this.state.camera})}>
                                <Image style={styles.image} source={require('./assets/images/camera-logo.png')}/>
                            </TouchableOpacity>
                        </Animatable.View>
                    </TouchableOpacity>

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
                </View>
                <View style={styles.row}>

                    <TouchableOpacity onPress={() => this.setState({tapped: !this.state.fontSize })}
                                      style={styles.animated}>
                        <Animatable.View
                            style={styles.button}
                            animation={this.state.tapped ? 'zoomOut' : 'slideInLeft'}
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
        title: 'Swipe vue'
    };
    
    
    componentDidMount() {
        console.log('compMounted');
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }
    
    render(){
        return(
            <Swiper style={styles.wrapper} showsButtons={false}>
                <View>
                  <Text style={styles.text}>Hello Swiper</Text>
                </View>
                <View>
                  <Text style={styles.text}>Beautiful</Text>
                </View>
                <View>
                  <Text style={styles.text}>And simple</Text>
                </View>
            </Swiper>
        );
    }
}

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
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 15
    },
    animated: {
        width: 160,
        height: 180
    },
    button: {
        width: 160,
        height: 180,
        borderWidth: 1,
        borderColor: '#000000'
    },
	image: {
		width: 130,
		height: 150
	}
});

const App = StackNavigator({
    Main: {screen: MainView},
    Camera: {screen: CameraView},
    Swipe: {screen: SwipeView}
    },
    {headerMode: 'screen'}
);


AppRegistry.registerComponent('Tp_AppFinale4_4_2', () => App);