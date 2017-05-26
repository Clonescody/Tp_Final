import React, {Component} from 'react';
import {ListView,} from 'react-native';

export default class AppLoader {
		
	constructor(){
		this.dataJson = '';
		this.dataLoaded = false;
		this.dataWritten = false;
	}
	
	init(){
		this._getNewsFromApi();
		return this.dataLoaded;
	}

	async _getNewsFromApi(){
		
		
		try {
			let response = await fetch('http://demo.centoapp.centaure-systems.fr/api/1/news/list');
			let responseJson = await response.json();
			this.dataJson = responseJson;
				console.log('data getNews : ',this.dataJson);
				return this.dataJson;
			} catch(error) {
			  console.error(error);
			}
		
		
		
		
		/*try{
			fetch('http://demo.centoapp.centaure-systems.fr/api/1/news/list')
						.then((response) => await response.json())
						.then((responseJson) => {
							this.dataJson = await responseJson;
							console.log("dataJson loader : ", this.dataJson);
							this.dataLoaded = true;
							})
						.catch((error) => {
							console.error(error);
						});
		}catch(e){
			console.error(e);
		}
		
		return this.dataJson;	*/			
	}
	
	_writeNews(){
		
		var RNFS = require('react-native-fs');

		var path = RNFS.DocumentDirectoryPath + '/news.json';

		RNFS.writeFile(path, this.dataJson, 'utf8')
		  .then((success) => {
			console.log('dataJson writer : ', this.dataJson)
			console.log('FILE WRITTEN!');
			this.dataWritten = true;
		  })
		  .catch((err) => {
			console.log(err.message);
		  });
		this._readNews();
	}
	
	_readNews(){
		
		var RNFS = require('react-native-fs');
		var path = RNFS.DocumentDirectoryPath + '/news.json';
		RNFS.readFile(path, 'utf8').then((news) => {console.log('newsFile', JSON.stringify(news))});
		
	}
}