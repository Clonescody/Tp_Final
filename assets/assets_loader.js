import React, {Component} from 'react';

import {AppRegistry, View, Text, Image} from 'react-native';

export default class AssetsComponents extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			datas: this._loadFile(),
			images: []
		};
		this._loadImages();
	}

	_loadFile(){
		return require('./json/actualites.json');
	}
	
	_loadImages(){
		var tmp = [];
		this.state.datas.forEach(function(item){
			tmp.push({id: item.id, url: item.image});
		});
		this.state.images = tmp;
	}
	
	getAsset(id){
		return this.state.images[id].url;	
	}

}
